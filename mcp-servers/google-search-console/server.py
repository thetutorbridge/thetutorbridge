#!/usr/bin/env python3
"""
Google Search Console MCP Server

An MCP server that provides tools to interact with Google Search Console API.
Enables querying search analytics, inspecting URLs, managing sitemaps, and more.
"""

import os
import sys
import json
import logging
from datetime import datetime, timedelta
from typing import Optional

from mcp.server.fastmcp import FastMCP
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Configure logging to stderr (NEVER use stdout in MCP servers)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stderr
)
logger = logging.getLogger("gsc-mcp")

# Initialize MCP server
mcp = FastMCP("google-search-console")

# Global service instance
_service = None
_credentials_path = None


def get_credentials_path() -> str:
    """Get the path to Google credentials file."""
    global _credentials_path
    if _credentials_path:
        return _credentials_path

    # Check environment variables in order of preference
    paths_to_try = [
        os.environ.get('GOOGLE_APPLICATION_CREDENTIALS'),
        os.environ.get('GSC_CREDENTIALS_PATH'),
        os.path.join(os.path.dirname(__file__), 'credentials.json'),
        os.path.expanduser('~/.config/gsc-mcp/credentials.json'),
    ]

    for path in paths_to_try:
        if path and os.path.exists(path):
            _credentials_path = path
            logger.info(f"Using credentials from: {path}")
            return path

    raise FileNotFoundError(
        "Google credentials not found. Set GOOGLE_APPLICATION_CREDENTIALS or "
        "GSC_CREDENTIALS_PATH environment variable, or place credentials.json "
        "in the server directory."
    )


def get_service():
    """Get or create the Google Search Console API service."""
    global _service
    if _service is not None:
        return _service

    credentials_path = get_credentials_path()

    credentials = service_account.Credentials.from_service_account_file(
        credentials_path,
        scopes=[
            'https://www.googleapis.com/auth/webmasters.readonly',
            'https://www.googleapis.com/auth/webmasters',
        ]
    )

    _service = build('searchconsole', 'v1', credentials=credentials)
    logger.info("Google Search Console service initialized")
    return _service


def format_site_url(url: str) -> str:
    """Format site URL for GSC API (must be exact property format)."""
    # GSC accepts URLs in format: https://example.com/ or sc-domain:example.com
    url = url.strip()
    if not url.startswith(('http://', 'https://', 'sc-domain:')):
        # Assume https if no protocol
        url = f'https://{url}'
    if not url.startswith('sc-domain:') and not url.endswith('/'):
        url = f'{url}/'
    return url


def get_date_range(days: int) -> tuple[str, str]:
    """Get start and end dates for the given number of days back."""
    end_date = datetime.now() - timedelta(days=3)  # GSC data has ~3 day delay
    start_date = end_date - timedelta(days=days)
    return start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')


# ============================================================================
# TOOLS
# ============================================================================

@mcp.tool()
def list_sites() -> dict:
    """
    List all sites (properties) you have access to in Google Search Console.

    Returns a list of all verified properties including URL-prefix and domain properties.
    """
    try:
        service = get_service()
        response = service.sites().list().execute()

        sites = response.get('siteEntry', [])
        return {
            'success': True,
            'total_sites': len(sites),
            'sites': [
                {
                    'site_url': site.get('siteUrl'),
                    'permission_level': site.get('permissionLevel')
                }
                for site in sites
            ]
        }
    except HttpError as e:
        logger.error(f"API error listing sites: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error listing sites: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def get_search_analytics(
    site_url: str,
    days: int = 28,
    dimensions: Optional[str] = "query,page",
    search_type: str = "web",
    row_limit: int = 100,
    start_row: int = 0
) -> dict:
    """
    Get search analytics data from Google Search Console.

    Args:
        site_url: The site URL (e.g., 'https://example.com/' or 'sc-domain:example.com')
        days: Number of days to look back (default: 28, max: 16 months)
        dimensions: Comma-separated dimensions: query, page, country, device, date (default: query,page)
        search_type: Type of search: web, image, video, news, discover, googleNews (default: web)
        row_limit: Maximum rows to return (default: 100, max: 25000)
        start_row: Starting row for pagination (default: 0)

    Returns:
        Search analytics data including clicks, impressions, CTR, and position.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)
        start_date, end_date = get_date_range(days)

        # Parse dimensions
        dim_list = [d.strip() for d in dimensions.split(',') if d.strip()]
        valid_dimensions = ['query', 'page', 'country', 'device', 'date', 'searchAppearance']
        dim_list = [d for d in dim_list if d in valid_dimensions]

        request_body = {
            'startDate': start_date,
            'endDate': end_date,
            'dimensions': dim_list,
            'type': search_type,
            'rowLimit': min(row_limit, 25000),
            'startRow': start_row,
        }

        response = service.searchanalytics().query(
            siteUrl=site_url,
            body=request_body
        ).execute()

        rows = response.get('rows', [])

        # Format results
        results = []
        for row in rows:
            result = {
                'clicks': row.get('clicks', 0),
                'impressions': row.get('impressions', 0),
                'ctr': round(row.get('ctr', 0) * 100, 2),  # Convert to percentage
                'position': round(row.get('position', 0), 1),
            }
            # Add dimension values
            keys = row.get('keys', [])
            for i, dim in enumerate(dim_list):
                if i < len(keys):
                    result[dim] = keys[i]
            results.append(result)

        return {
            'success': True,
            'site_url': site_url,
            'date_range': {'start': start_date, 'end': end_date},
            'dimensions': dim_list,
            'search_type': search_type,
            'total_rows': len(results),
            'rows': results
        }
    except HttpError as e:
        logger.error(f"API error getting search analytics: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error getting search analytics: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def get_top_queries(
    site_url: str,
    days: int = 28,
    limit: int = 50,
    min_clicks: int = 0,
    min_impressions: int = 0
) -> dict:
    """
    Get top performing search queries for a site.

    Args:
        site_url: The site URL
        days: Number of days to look back (default: 28)
        limit: Number of top queries to return (default: 50)
        min_clicks: Minimum clicks filter (default: 0)
        min_impressions: Minimum impressions filter (default: 0)

    Returns:
        Top queries sorted by clicks, with CTR and position data.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)
        start_date, end_date = get_date_range(days)

        response = service.searchanalytics().query(
            siteUrl=site_url,
            body={
                'startDate': start_date,
                'endDate': end_date,
                'dimensions': ['query'],
                'type': 'web',
                'rowLimit': 1000,  # Get more to filter
            }
        ).execute()

        rows = response.get('rows', [])

        # Filter and format
        results = []
        for row in rows:
            clicks = row.get('clicks', 0)
            impressions = row.get('impressions', 0)

            if clicks >= min_clicks and impressions >= min_impressions:
                results.append({
                    'query': row.get('keys', [''])[0],
                    'clicks': clicks,
                    'impressions': impressions,
                    'ctr': round(row.get('ctr', 0) * 100, 2),
                    'position': round(row.get('position', 0), 1),
                })

        # Sort by clicks descending
        results.sort(key=lambda x: x['clicks'], reverse=True)
        results = results[:limit]

        # Calculate totals
        total_clicks = sum(r['clicks'] for r in results)
        total_impressions = sum(r['impressions'] for r in results)

        return {
            'success': True,
            'site_url': site_url,
            'date_range': {'start': start_date, 'end': end_date},
            'summary': {
                'total_queries': len(results),
                'total_clicks': total_clicks,
                'total_impressions': total_impressions,
                'avg_ctr': round((total_clicks / total_impressions * 100) if total_impressions > 0 else 0, 2),
            },
            'queries': results
        }
    except HttpError as e:
        logger.error(f"API error getting top queries: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error getting top queries: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def get_top_pages(
    site_url: str,
    days: int = 28,
    limit: int = 50
) -> dict:
    """
    Get top performing pages for a site.

    Args:
        site_url: The site URL
        days: Number of days to look back (default: 28)
        limit: Number of top pages to return (default: 50)

    Returns:
        Top pages sorted by clicks, with impressions, CTR, and position.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)
        start_date, end_date = get_date_range(days)

        response = service.searchanalytics().query(
            siteUrl=site_url,
            body={
                'startDate': start_date,
                'endDate': end_date,
                'dimensions': ['page'],
                'type': 'web',
                'rowLimit': min(limit, 25000),
            }
        ).execute()

        rows = response.get('rows', [])

        results = []
        for row in rows:
            results.append({
                'page': row.get('keys', [''])[0],
                'clicks': row.get('clicks', 0),
                'impressions': row.get('impressions', 0),
                'ctr': round(row.get('ctr', 0) * 100, 2),
                'position': round(row.get('position', 0), 1),
            })

        return {
            'success': True,
            'site_url': site_url,
            'date_range': {'start': start_date, 'end': end_date},
            'total_pages': len(results),
            'pages': results
        }
    except HttpError as e:
        logger.error(f"API error getting top pages: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error getting top pages: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def get_page_queries(
    site_url: str,
    page_url: str,
    days: int = 28,
    limit: int = 100
) -> dict:
    """
    Get all queries driving traffic to a specific page.

    Args:
        site_url: The site URL
        page_url: The specific page URL to analyze
        days: Number of days to look back (default: 28)
        limit: Number of queries to return (default: 100)

    Returns:
        Queries for the specified page with performance metrics.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)
        start_date, end_date = get_date_range(days)

        response = service.searchanalytics().query(
            siteUrl=site_url,
            body={
                'startDate': start_date,
                'endDate': end_date,
                'dimensions': ['query'],
                'type': 'web',
                'dimensionFilterGroups': [{
                    'filters': [{
                        'dimension': 'page',
                        'operator': 'equals',
                        'expression': page_url
                    }]
                }],
                'rowLimit': min(limit, 25000),
            }
        ).execute()

        rows = response.get('rows', [])

        results = []
        for row in rows:
            results.append({
                'query': row.get('keys', [''])[0],
                'clicks': row.get('clicks', 0),
                'impressions': row.get('impressions', 0),
                'ctr': round(row.get('ctr', 0) * 100, 2),
                'position': round(row.get('position', 0), 1),
            })

        return {
            'success': True,
            'site_url': site_url,
            'page_url': page_url,
            'date_range': {'start': start_date, 'end': end_date},
            'total_queries': len(results),
            'queries': results
        }
    except HttpError as e:
        logger.error(f"API error getting page queries: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error getting page queries: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def get_performance_by_country(
    site_url: str,
    days: int = 28,
    limit: int = 50
) -> dict:
    """
    Get search performance breakdown by country.

    Args:
        site_url: The site URL
        days: Number of days to look back (default: 28)
        limit: Number of countries to return (default: 50)

    Returns:
        Performance metrics grouped by country.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)
        start_date, end_date = get_date_range(days)

        response = service.searchanalytics().query(
            siteUrl=site_url,
            body={
                'startDate': start_date,
                'endDate': end_date,
                'dimensions': ['country'],
                'type': 'web',
                'rowLimit': min(limit, 25000),
            }
        ).execute()

        rows = response.get('rows', [])

        results = []
        for row in rows:
            results.append({
                'country': row.get('keys', [''])[0],
                'clicks': row.get('clicks', 0),
                'impressions': row.get('impressions', 0),
                'ctr': round(row.get('ctr', 0) * 100, 2),
                'position': round(row.get('position', 0), 1),
            })

        return {
            'success': True,
            'site_url': site_url,
            'date_range': {'start': start_date, 'end': end_date},
            'total_countries': len(results),
            'countries': results
        }
    except HttpError as e:
        logger.error(f"API error getting country performance: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error getting country performance: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def get_performance_by_device(
    site_url: str,
    days: int = 28
) -> dict:
    """
    Get search performance breakdown by device type (mobile, desktop, tablet).

    Args:
        site_url: The site URL
        days: Number of days to look back (default: 28)

    Returns:
        Performance metrics grouped by device type.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)
        start_date, end_date = get_date_range(days)

        response = service.searchanalytics().query(
            siteUrl=site_url,
            body={
                'startDate': start_date,
                'endDate': end_date,
                'dimensions': ['device'],
                'type': 'web',
                'rowLimit': 10,
            }
        ).execute()

        rows = response.get('rows', [])

        results = []
        total_clicks = 0
        total_impressions = 0

        for row in rows:
            clicks = row.get('clicks', 0)
            impressions = row.get('impressions', 0)
            total_clicks += clicks
            total_impressions += impressions

            results.append({
                'device': row.get('keys', [''])[0],
                'clicks': clicks,
                'impressions': impressions,
                'ctr': round(row.get('ctr', 0) * 100, 2),
                'position': round(row.get('position', 0), 1),
            })

        # Add percentage share
        for result in results:
            result['click_share'] = round((result['clicks'] / total_clicks * 100) if total_clicks > 0 else 0, 1)
            result['impression_share'] = round((result['impressions'] / total_impressions * 100) if total_impressions > 0 else 0, 1)

        return {
            'success': True,
            'site_url': site_url,
            'date_range': {'start': start_date, 'end': end_date},
            'summary': {
                'total_clicks': total_clicks,
                'total_impressions': total_impressions,
            },
            'devices': results
        }
    except HttpError as e:
        logger.error(f"API error getting device performance: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error getting device performance: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def get_performance_over_time(
    site_url: str,
    days: int = 28
) -> dict:
    """
    Get daily search performance trends over time.

    Args:
        site_url: The site URL
        days: Number of days to look back (default: 28)

    Returns:
        Daily performance metrics for trend analysis.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)
        start_date, end_date = get_date_range(days)

        response = service.searchanalytics().query(
            siteUrl=site_url,
            body={
                'startDate': start_date,
                'endDate': end_date,
                'dimensions': ['date'],
                'type': 'web',
                'rowLimit': 500,
            }
        ).execute()

        rows = response.get('rows', [])

        # Sort by date
        results = []
        for row in rows:
            results.append({
                'date': row.get('keys', [''])[0],
                'clicks': row.get('clicks', 0),
                'impressions': row.get('impressions', 0),
                'ctr': round(row.get('ctr', 0) * 100, 2),
                'position': round(row.get('position', 0), 1),
            })

        results.sort(key=lambda x: x['date'])

        # Calculate summary stats
        if results:
            total_clicks = sum(r['clicks'] for r in results)
            total_impressions = sum(r['impressions'] for r in results)
            avg_position = sum(r['position'] for r in results) / len(results)

            # Week over week comparison
            mid = len(results) // 2
            first_half_clicks = sum(r['clicks'] for r in results[:mid])
            second_half_clicks = sum(r['clicks'] for r in results[mid:])

            click_trend = 'up' if second_half_clicks > first_half_clicks else 'down' if second_half_clicks < first_half_clicks else 'stable'
            click_change = round(((second_half_clicks - first_half_clicks) / first_half_clicks * 100) if first_half_clicks > 0 else 0, 1)
        else:
            total_clicks = 0
            total_impressions = 0
            avg_position = 0
            click_trend = 'stable'
            click_change = 0

        return {
            'success': True,
            'site_url': site_url,
            'date_range': {'start': start_date, 'end': end_date},
            'summary': {
                'total_clicks': total_clicks,
                'total_impressions': total_impressions,
                'avg_position': round(avg_position, 1),
                'trend': click_trend,
                'change_percent': click_change,
            },
            'daily_data': results
        }
    except HttpError as e:
        logger.error(f"API error getting performance over time: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error getting performance over time: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def find_opportunity_keywords(
    site_url: str,
    days: int = 28,
    min_impressions: int = 100,
    max_position: float = 20,
    min_position: float = 4
) -> dict:
    """
    Find keywords with high impressions but low rankings (SEO opportunities).

    These are keywords where you're getting visibility but could improve
    click-through rates with better rankings.

    Args:
        site_url: The site URL
        days: Number of days to look back (default: 28)
        min_impressions: Minimum impressions to consider (default: 100)
        max_position: Maximum average position (default: 20)
        min_position: Minimum position - keywords ranking better than this are excluded (default: 4)

    Returns:
        Keywords with opportunity for ranking improvement.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)
        start_date, end_date = get_date_range(days)

        response = service.searchanalytics().query(
            siteUrl=site_url,
            body={
                'startDate': start_date,
                'endDate': end_date,
                'dimensions': ['query'],
                'type': 'web',
                'rowLimit': 5000,
            }
        ).execute()

        rows = response.get('rows', [])

        # Filter for opportunity keywords
        opportunities = []
        for row in rows:
            impressions = row.get('impressions', 0)
            position = row.get('position', 0)

            if impressions >= min_impressions and min_position <= position <= max_position:
                # Calculate potential clicks if we improved to position 3
                current_ctr = row.get('ctr', 0)
                estimated_better_ctr = 0.10  # ~10% CTR at position 3
                potential_clicks = int(impressions * (estimated_better_ctr - current_ctr))

                opportunities.append({
                    'query': row.get('keys', [''])[0],
                    'impressions': impressions,
                    'clicks': row.get('clicks', 0),
                    'ctr': round(current_ctr * 100, 2),
                    'position': round(position, 1),
                    'potential_additional_clicks': max(0, potential_clicks),
                })

        # Sort by potential
        opportunities.sort(key=lambda x: x['potential_additional_clicks'], reverse=True)

        return {
            'success': True,
            'site_url': site_url,
            'date_range': {'start': start_date, 'end': end_date},
            'filters': {
                'min_impressions': min_impressions,
                'position_range': f'{min_position}-{max_position}'
            },
            'total_opportunities': len(opportunities),
            'opportunities': opportunities[:100]  # Top 100
        }
    except HttpError as e:
        logger.error(f"API error finding opportunities: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error finding opportunities: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def get_sitemaps(site_url: str) -> dict:
    """
    List all sitemaps submitted to Google Search Console for a site.

    Args:
        site_url: The site URL

    Returns:
        List of sitemaps with submission status and statistics.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)

        response = service.sitemaps().list(siteUrl=site_url).execute()

        sitemaps = response.get('sitemap', [])

        results = []
        for sitemap in sitemaps:
            results.append({
                'path': sitemap.get('path'),
                'last_submitted': sitemap.get('lastSubmitted'),
                'last_downloaded': sitemap.get('lastDownloaded'),
                'is_pending': sitemap.get('isPending', False),
                'is_sitemaps_index': sitemap.get('isSitemapsIndex', False),
                'type': sitemap.get('type'),
                'warnings': sitemap.get('warnings', 0),
                'errors': sitemap.get('errors', 0),
            })

        return {
            'success': True,
            'site_url': site_url,
            'total_sitemaps': len(results),
            'sitemaps': results
        }
    except HttpError as e:
        logger.error(f"API error getting sitemaps: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error getting sitemaps: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def submit_sitemap(site_url: str, sitemap_url: str) -> dict:
    """
    Submit a sitemap to Google Search Console.

    Args:
        site_url: The site URL
        sitemap_url: Full URL to the sitemap (e.g., https://example.com/sitemap.xml)

    Returns:
        Submission status.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)

        service.sitemaps().submit(siteUrl=site_url, feedpath=sitemap_url).execute()

        return {
            'success': True,
            'site_url': site_url,
            'sitemap_url': sitemap_url,
            'message': 'Sitemap submitted successfully'
        }
    except HttpError as e:
        logger.error(f"API error submitting sitemap: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error submitting sitemap: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def delete_sitemap(site_url: str, sitemap_url: str) -> dict:
    """
    Delete a sitemap from Google Search Console.

    Args:
        site_url: The site URL
        sitemap_url: Full URL to the sitemap to delete

    Returns:
        Deletion status.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)

        service.sitemaps().delete(siteUrl=site_url, feedpath=sitemap_url).execute()

        return {
            'success': True,
            'site_url': site_url,
            'sitemap_url': sitemap_url,
            'message': 'Sitemap deleted successfully'
        }
    except HttpError as e:
        logger.error(f"API error deleting sitemap: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error deleting sitemap: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def inspect_url(site_url: str, page_url: str) -> dict:
    """
    Inspect a URL to see its index status in Google Search Console.

    Args:
        site_url: The site URL (property)
        page_url: The specific page URL to inspect

    Returns:
        Index status and crawl information for the URL.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)

        response = service.urlInspection().index().inspect(
            body={
                'inspectionUrl': page_url,
                'siteUrl': site_url
            }
        ).execute()

        result = response.get('inspectionResult', {})
        index_status = result.get('indexStatusResult', {})
        mobile_usability = result.get('mobileUsabilityResult', {})
        rich_results = result.get('richResultsResult', {})

        return {
            'success': True,
            'site_url': site_url,
            'inspected_url': page_url,
            'index_status': {
                'verdict': index_status.get('verdict'),
                'coverage_state': index_status.get('coverageState'),
                'robots_txt_state': index_status.get('robotsTxtState'),
                'indexing_state': index_status.get('indexingState'),
                'last_crawl_time': index_status.get('lastCrawlTime'),
                'page_fetch_state': index_status.get('pageFetchState'),
                'google_canonical': index_status.get('googleCanonical'),
                'user_canonical': index_status.get('userCanonical'),
                'referring_urls': index_status.get('referringUrls', []),
            },
            'mobile_usability': {
                'verdict': mobile_usability.get('verdict'),
                'issues': mobile_usability.get('issues', []),
            },
            'rich_results': {
                'verdict': rich_results.get('verdict'),
                'detected_items': rich_results.get('detectedItems', []),
            }
        }
    except HttpError as e:
        logger.error(f"API error inspecting URL: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error inspecting URL: {e}")
        return {'success': False, 'error': str(e)}


@mcp.tool()
def compare_periods(
    site_url: str,
    days: int = 28
) -> dict:
    """
    Compare search performance between two time periods (current vs previous).

    Args:
        site_url: The site URL
        days: Number of days for each period (default: 28)

    Returns:
        Comparison of clicks, impressions, CTR, and position between periods.
    """
    try:
        service = get_service()
        site_url = format_site_url(site_url)

        # Current period
        current_end = datetime.now() - timedelta(days=3)
        current_start = current_end - timedelta(days=days)

        # Previous period
        previous_end = current_start - timedelta(days=1)
        previous_start = previous_end - timedelta(days=days)

        # Fetch current period
        current_response = service.searchanalytics().query(
            siteUrl=site_url,
            body={
                'startDate': current_start.strftime('%Y-%m-%d'),
                'endDate': current_end.strftime('%Y-%m-%d'),
                'dimensions': [],
                'type': 'web',
            }
        ).execute()

        # Fetch previous period
        previous_response = service.searchanalytics().query(
            siteUrl=site_url,
            body={
                'startDate': previous_start.strftime('%Y-%m-%d'),
                'endDate': previous_end.strftime('%Y-%m-%d'),
                'dimensions': [],
                'type': 'web',
            }
        ).execute()

        # Extract data
        current_rows = current_response.get('rows', [{}])
        previous_rows = previous_response.get('rows', [{}])

        current_data = current_rows[0] if current_rows else {}
        previous_data = previous_rows[0] if previous_rows else {}

        def calc_change(current, previous):
            if previous == 0:
                return 100 if current > 0 else 0
            return round((current - previous) / previous * 100, 1)

        current_clicks = current_data.get('clicks', 0)
        previous_clicks = previous_data.get('clicks', 0)
        current_impressions = current_data.get('impressions', 0)
        previous_impressions = previous_data.get('impressions', 0)
        current_ctr = current_data.get('ctr', 0) * 100
        previous_ctr = previous_data.get('ctr', 0) * 100
        current_position = current_data.get('position', 0)
        previous_position = previous_data.get('position', 0)

        return {
            'success': True,
            'site_url': site_url,
            'current_period': {
                'start': current_start.strftime('%Y-%m-%d'),
                'end': current_end.strftime('%Y-%m-%d'),
            },
            'previous_period': {
                'start': previous_start.strftime('%Y-%m-%d'),
                'end': previous_end.strftime('%Y-%m-%d'),
            },
            'comparison': {
                'clicks': {
                    'current': current_clicks,
                    'previous': previous_clicks,
                    'change': current_clicks - previous_clicks,
                    'change_percent': calc_change(current_clicks, previous_clicks),
                },
                'impressions': {
                    'current': current_impressions,
                    'previous': previous_impressions,
                    'change': current_impressions - previous_impressions,
                    'change_percent': calc_change(current_impressions, previous_impressions),
                },
                'ctr': {
                    'current': round(current_ctr, 2),
                    'previous': round(previous_ctr, 2),
                    'change': round(current_ctr - previous_ctr, 2),
                },
                'position': {
                    'current': round(current_position, 1),
                    'previous': round(previous_position, 1),
                    'change': round(previous_position - current_position, 1),  # Inverted (lower is better)
                },
            }
        }
    except HttpError as e:
        logger.error(f"API error comparing periods: {e}")
        return {'success': False, 'error': str(e)}
    except Exception as e:
        logger.error(f"Error comparing periods: {e}")
        return {'success': False, 'error': str(e)}


# ============================================================================
# MAIN
# ============================================================================

def main():
    """Run the MCP server."""
    logger.info("Starting Google Search Console MCP Server")
    mcp.run(transport="stdio")


if __name__ == "__main__":
    main()

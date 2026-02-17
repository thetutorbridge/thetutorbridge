# Google Search Console MCP Server

An MCP (Model Context Protocol) server that provides tools to interact with Google Search Console API directly from Claude Code.

## Features

This MCP server provides the following tools:

| Tool | Description |
|------|-------------|
| `list_sites` | List all GSC properties you have access to |
| `get_search_analytics` | Get search analytics with custom dimensions |
| `get_top_queries` | Get top performing search queries |
| `get_top_pages` | Get top performing pages |
| `get_page_queries` | Get all queries driving traffic to a specific page |
| `get_performance_by_country` | Performance breakdown by country |
| `get_performance_by_device` | Performance breakdown by device type |
| `get_performance_over_time` | Daily performance trends |
| `find_opportunity_keywords` | Find keywords with ranking improvement potential |
| `get_sitemaps` | List all submitted sitemaps |
| `submit_sitemap` | Submit a new sitemap |
| `delete_sitemap` | Delete a sitemap |
| `inspect_url` | Get index status for a specific URL |
| `compare_periods` | Compare performance between two time periods |

## Prerequisites

- Python 3.10+
- Google Cloud Project with Search Console API enabled
- Service Account with access to your GSC properties

## Setup

### 1. Clone/Navigate to the server directory

```bash
cd mcp-servers/google-search-console
```

### 2. Run the setup script

```bash
chmod +x setup.sh
./setup.sh
```

Or manually:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Set up Google Cloud credentials

#### Create a Service Account:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Search Console API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Search Console API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Give it a name (e.g., "gsc-mcp-server")
   - Click "Create and Continue"
   - Skip the optional steps and click "Done"
5. Create a key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Select "JSON" and click "Create"
   - Save the downloaded file as `credentials.json` in this directory

#### Grant Search Console access:

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select your property
3. Go to "Settings" > "Users and permissions"
4. Click "Add user"
5. Enter the service account email (found in your credentials.json as `client_email`)
6. Set permission to "Full" (or "Restricted" for read-only)
7. Click "Add"

### 4. Add to Claude Code

```bash
# Basic setup (credentials in default location)
claude mcp add gsc -s user -- /path/to/venv/bin/python /path/to/server.py

# With explicit credentials path
claude mcp add gsc -s user \
  -e GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json \
  -- /path/to/venv/bin/python /path/to/server.py
```

Full example with this project:

```bash
claude mcp add gsc -s user \
  -e GOOGLE_APPLICATION_CREDENTIALS=/Users/rishabhjain/Downloads/12th_NOV_TTB/thetutorbridge/mcp-servers/google-search-console/credentials.json \
  -- /Users/rishabhjain/Downloads/12th_NOV_TTB/thetutorbridge/mcp-servers/google-search-console/venv/bin/python \
  /Users/rishabhjain/Downloads/12th_NOV_TTB/thetutorbridge/mcp-servers/google-search-console/server.py
```

### 5. Verify installation

```bash
claude mcp list
```

You should see `gsc` in the list of configured servers.

## Usage Examples

Once configured, you can use natural language to interact with GSC:

```
> What are my top 10 search queries for thetutorbridge.com?
> Show me pages with high impressions but low clicks
> Compare last 28 days performance to the previous period
> What queries are driving traffic to /blog/chemistry-tutoring?
> Find SEO opportunities - keywords ranking between positions 5-15
> Check the index status of https://thetutorbridge.com/tutors
> List all my sitemaps
```

## Tool Details

### get_search_analytics

The most flexible tool for custom queries:

```
Parameters:
- site_url: Your GSC property URL
- days: Days to look back (default: 28)
- dimensions: Comma-separated: query, page, country, device, date
- search_type: web, image, video, news, discover
- row_limit: Max rows (default: 100, max: 25000)
```

### find_opportunity_keywords

Finds keywords where you're getting impressions but could rank better:

```
Parameters:
- site_url: Your GSC property URL
- days: Days to look back (default: 28)
- min_impressions: Filter threshold (default: 100)
- min_position: Lower bound (default: 4)
- max_position: Upper bound (default: 20)
```

### inspect_url

Get detailed index status including:
- Crawl status
- Index status
- Mobile usability issues
- Rich results detection
- Canonical URL information

## Troubleshooting

### "Credentials not found"

Make sure either:
- `credentials.json` exists in the server directory
- `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set

### "Permission denied" errors

1. Verify the service account email has been added to your GSC property
2. Check that the permission level is "Full" (for write operations) or "Restricted" (for read-only)

### "API not enabled"

Enable the Google Search Console API in your Google Cloud Console project.

### Server not responding

Check the Claude Code logs:
```bash
claude mcp logs gsc
```

## Development

To modify or extend the server:

1. Edit `server.py`
2. Add new tools using the `@mcp.tool()` decorator
3. Test locally:
   ```bash
   source venv/bin/activate
   python server.py
   ```

## License

MIT

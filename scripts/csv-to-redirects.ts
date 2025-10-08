import * as fs from 'fs';
import * as path from 'path';

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

function csvToRedirects(csvPath: string, jsonPath: string): void {
  try {
    // Read the CSV file
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');

    // Skip header row
    const dataLines = lines.slice(1);

    const redirects: Redirect[] = [];

    dataLines.forEach(line => {
      const [from, to] = line.split(',').map(s => s.trim());

      // Extract path from full URL (remove protocol and domain)
      const fromPath = from.replace(/https?:\/\/[^/]+/, '');
      const toUrl = to;

      // Add redirect with trailing slash
      redirects.push({
        source: fromPath,
        destination: toUrl,
        permanent: true
      });

      // Also add redirect without trailing slash if the original has one
      if (fromPath.endsWith('/') && fromPath !== '/') {
        const fromPathNoSlash = fromPath.slice(0, -1);
        const toUrlNoSlash = toUrl.endsWith('/') ? toUrl.slice(0, -1) : toUrl;

        redirects.push({
          source: fromPathNoSlash,
          destination: toUrlNoSlash,
          permanent: true
        });
      }
    });

    // Write to JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(redirects, null, 2), 'utf-8');

    console.log(`✅ Successfully converted ${redirects.length} redirects from CSV to JSON`);
    console.log(`📄 Output file: ${jsonPath}`);
  } catch (error) {
    console.error('❌ Error converting CSV to JSON:', error);
    process.exit(1);
  }
}

// Main execution
const csvPath = path.join(process.cwd(), 'redirects', 'wp-redirects.csv');
const jsonPath = path.join(process.cwd(), 'redirects', 'wp-redirects.json');

csvToRedirects(csvPath, jsonPath);

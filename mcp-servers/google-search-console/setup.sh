#!/bin/bash
# Google Search Console MCP Server Setup Script

set -e

echo "Setting up Google Search Console MCP Server..."

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Check for credentials
if [ ! -f "credentials.json" ] && [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo ""
    echo "WARNING: No credentials found!"
    echo ""
    echo "To use this MCP server, you need Google Cloud credentials:"
    echo "1. Go to Google Cloud Console: https://console.cloud.google.com/"
    echo "2. Create a project or select existing one"
    echo "3. Enable 'Google Search Console API'"
    echo "4. Go to 'IAM & Admin' > 'Service Accounts'"
    echo "5. Create a service account"
    echo "6. Download the JSON key file"
    echo "7. Either:"
    echo "   - Place it as 'credentials.json' in this directory"
    echo "   - Or set GOOGLE_APPLICATION_CREDENTIALS environment variable"
    echo ""
    echo "Then add the service account email to your Search Console property:"
    echo "1. Go to Search Console: https://search.google.com/search-console/"
    echo "2. Select your property"
    echo "3. Go to Settings > Users and permissions"
    echo "4. Add the service account email with 'Full' permission"
    echo ""
fi

echo ""
echo "Setup complete!"
echo ""
echo "To add this MCP server to Claude Code, run:"
echo ""
echo "  claude mcp add gsc -s user -- $SCRIPT_DIR/venv/bin/python $SCRIPT_DIR/server.py"
echo ""
echo "Or with credentials path:"
echo ""
echo "  claude mcp add gsc -s user -e GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json -- $SCRIPT_DIR/venv/bin/python $SCRIPT_DIR/server.py"
echo ""

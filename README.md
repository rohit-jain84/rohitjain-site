# Rohit Jain - Portfolio

Personal portfolio website for Rohit Jain, Engineering Leader & Architect.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Static build output

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header/
│   ├── Hero/
│   ├── Summary/
│   ├── Projects/
│   ├── Experience/
│   ├── Skills/
│   ├── Education/
│   ├── Contact/
│   ├── Footer/
│   └── shared/          # Reusable components
├── data/
│   └── resume.ts        # All content (source of truth)
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## Deployment to Azure Static Web Apps

### Prerequisites

1. Azure account
2. GitHub repository with this code
3. Azure Static Web Apps extension (optional, for VS Code)

### Option 1: Azure Portal

1. Go to Azure Portal → Create a resource → Static Web App
2. Select your GitHub repository
3. Configure build settings:
   - **App location:** `/portfolio`
   - **API location:** (leave empty)
   - **Output location:** `dist`
4. Azure will create a GitHub Actions workflow automatically

### Option 2: Azure CLI

```bash
# Login to Azure
az login

# Create resource group (if needed)
az group create --name rg-portfolio --location eastus

# Create Static Web App
az staticwebapp create \
  --name rohitjain-portfolio \
  --resource-group rg-portfolio \
  --source https://github.com/YOUR_USERNAME/YOUR_REPO \
  --location eastus \
  --branch main \
  --app-location "/portfolio" \
  --output-location "dist" \
  --login-with-github
```

### Option 3: GitHub Actions (Manual)

Create `.github/workflows/azure-static-web-apps.yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          lfs: false

      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/portfolio"
          api_location: ""
          output_location: "dist"

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

## Custom Domain Setup (Cloudflare)

### 1. Add Custom Domain in Azure

1. Go to Azure Portal → Your Static Web App → Custom domains
2. Click "Add"
3. Enter your domain (e.g., `rohitjain.com`)
4. Azure will provide a CNAME or TXT record for verification

### 2. Configure Cloudflare DNS

For apex domain (`rohitjain.com`):
```
Type: CNAME
Name: @
Target: <your-app>.azurestaticapps.net
Proxy: DNS only (gray cloud) during setup, then enable proxy
```

For www subdomain:
```
Type: CNAME
Name: www
Target: <your-app>.azurestaticapps.net
Proxy: DNS only (gray cloud) during setup, then enable proxy
```

### 3. SSL/TLS Settings in Cloudflare

1. Go to SSL/TLS → Overview
2. Set encryption mode to "Full" (not "Full (strict)" initially)
3. After Azure validates, you can switch to "Full (strict)"

### 4. Redirect www to apex (optional)

In Cloudflare → Rules → Redirect Rules:
```
If: Hostname equals www.rohitjain.com
Then: Dynamic redirect to https://rohitjain.com${http.request.uri.path}
Status: 301
```

## Build Output

- Output folder: `dist/`
- No server-side dependencies
- All assets are static
- CSS is purged and minified (~3KB gzipped)
- JS bundle (~67KB gzipped, includes React)

## Content Updates

All content is centralized in `src/data/resume.ts`. To update:

1. Edit the data file
2. Run `npm run build`
3. Push to GitHub (auto-deploys via GitHub Actions)

## License

Private - All rights reserved.

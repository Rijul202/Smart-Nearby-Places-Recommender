# Google Maps API Setup Guide

This guide will walk you through setting up Google Maps API keys and enabling the necessary APIs for the Smart Nearby Places Recommender application.

## Prerequisites

1. A Google account (Gmail account works)
2. Access to Google Cloud Console
3. A payment method (required, but you get $200 free credits monthly)

## Step-by-Step Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top
4. Click **"New Project"**
5. Enter a project name (e.g., "Nearby Places Recommender")
6. Click **"Create"**
7. Wait for the project to be created, then select it from the dropdown

### Step 2: Enable Billing (Required but Free Credits Available)

⚠️ **Important**: Google requires a payment method even though they provide $200 in free credits monthly. Most small projects stay within the free tier.

1. In the left sidebar, click **"Billing"**
2. Click **"Link a billing account"**
3. Follow the prompts to add a payment method
4. Don't worry - you'll get $200 free credits per month

### Step 3: Enable Required APIs

You need to enable **three APIs**:

#### API 1: Maps JavaScript API
1. Go to [API Library](https://console.cloud.google.com/apis/library)
2. Search for **"Maps JavaScript API"**
3. Click on it
4. Click **"Enable"**

#### API 2: Places API
1. Still in the API Library, search for **"Places API"**
2. Click on it
3. Click **"Enable"**

#### API 3: Geocoding API (for address conversion)
1. Still in the API Library, search for **"Geocoding API"**
2. Click on it
3. Click **"Enable"**

### Step 4: Create an API Key

1. Go to [Credentials page](https://console.cloud.google.com/apis/credentials)
2. Click **"Create Credentials"** at the top
3. Select **"API key"**
4. Copy the API key that appears (you can restrict it later)
5. ⚠️ **Save this key somewhere safe** - you'll need it in the next step

### Step 5: (Optional but Recommended) Restrict Your API Key

To protect your API key from abuse:

1. Click on the API key you just created
2. Under **"API restrictions"**, select **"Restrict key"**
3. Check these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Under **"Application restrictions"**, you can optionally:
   - Select **"HTTP referrers"** for web apps
   - Add your domain (e.g., `localhost:3000/*` for development)
5. Click **"Save"**

### Step 6: Add API Key to Your Project

1. In your project root directory, create a file named `.env` (if it doesn't exist)
2. Add the following line:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

3. Replace `your_api_key_here` with the API key you copied in Step 4
4. Save the file

**Example:**
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuvw
```

### Step 7: Restart Your Development Server

1. Stop your current dev server (Ctrl+C in terminal)
2. Restart it:
   ```bash
   npm run dev
   ```
3. The app should now load Google Maps correctly!

## Quick Checklist

- [ ] Created Google Cloud project
- [ ] Enabled billing (or linked billing account)
- [ ] Enabled Maps JavaScript API
- [ ] Enabled Places API
- [ ] Enabled Geocoding API
- [ ] Created API key
- [ ] (Optional) Restricted API key
- [ ] Created `.env` file with API key
- [ ] Restarted dev server

## Troubleshooting

### Error: "This API project is not authorized to use this API"

- Make sure you've enabled all three APIs (Maps JavaScript API, Places API, Geocoding API)
- Wait a few minutes after enabling - APIs can take time to propagate

### Error: "RefererNotAllowedMapError" or "RefererNotAllowedMapError"

- Check your API key restrictions
- Make sure `localhost:3000` is allowed in HTTP referrers
- Or temporarily remove application restrictions for testing

### Error: "ApiNotActivatedMapError"

- Double-check that all three APIs are enabled
- Go to [API Library](https://console.cloud.google.com/apis/library) and verify

### Error: "RequestDeniedMapError"

- Check if billing is enabled
- Verify your API key is correct in the `.env` file
- Make sure the API key has the correct APIs enabled

### Map Still Not Loading

1. Check browser console for specific errors
2. Verify `.env` file is in the project root (same level as `package.json`)
3. Make sure variable name is exactly: `VITE_GOOGLE_MAPS_API_KEY`
4. Restart the dev server after creating/editing `.env`
5. Check that your API key is not restricted too much for development

## Pricing Information

Google provides **$200 in free credits monthly**, which covers:
- 28,000 map loads
- 40,000 geocoding requests
- 17,000 Places API requests

For most development and small projects, you'll stay well within the free tier.

## Need Help?

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Google Cloud Console](https://console.cloud.google.com/)
- [API Status Dashboard](https://status.cloud.google.com/)

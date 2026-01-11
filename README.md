# Smart Nearby Places Recommender

A React-based web application that helps users discover and filter nearby places using Google Maps and Places API. Built with React, Vite, and Google Maps JavaScript API.

## Features

- 📍 **Automatic Geolocation** - Detects your location automatically with manual input fallback
- 🗺️ **Interactive Maps** - Google Maps integration with markers and user location
- 🔍 **Nearby Places Search** - Find places within 5km radius
- 🎯 **Advanced Filtering** - Filter by rating, price level, and open status
- 📊 **Smart Sorting** - Sort by distance, rating, open status, or name
- 📏 **Distance Display** - See exact distance to each place
- 💫 **Modern UI** - Clean, responsive design that works on all devices
- 🎨 **Smooth Interactions** - Auto-scroll, map panning, and visual feedback

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout/         # Main layout component
│   ├── LocationHandler/# Location detection and input
│   ├── LocationInput/  # Manual location input form
│   ├── Map/            # Google Maps component
│   ├── PlacesList/     # List of nearby places
│   ├── PlaceTypeSelector/ # Place type/category selector
│   ├── Filters/        # Filtering controls
│   └── SortSelector/   # Sorting controls
├── hooks/              # Custom React hooks
│   ├── useGeolocation.js
│   ├── useGeocoder.js
│   └── usePlaces.js
├── services/           # API services
│   ├── googleMapsService.js
│   └── placesService.js
├── utils/              # Utility functions
│   ├── locationUtils.js
│   ├── filterUtils.js
│   └── sortUtils.js
├── App.jsx             # Main App component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Maps API key with billing enabled
- Google Cloud account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd projet1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your Google Maps API key:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. **Get your Google Maps API key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or use existing)
   - Enable billing (required, but includes $200/month free credits)
   - Enable these APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API
   - Create an API key in Credentials
   - **See `SETUP_GUIDE.md` for detailed step-by-step instructions**

### Running the Application

**Development mode:**
```bash
npm run dev
```

The application will start at `http://localhost:3000`

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Usage

1. **Location Setup**
   - Allow location access when prompted (for automatic detection)
   - Or manually enter an address/coordinates

2. **Find Places**
   - Places are automatically loaded based on your location
   - Use the type selector to filter by category (restaurants, cafes, etc.)

3. **Filter Results**
   - Set minimum rating (3.0+, 3.5+, 4.0+, 4.5+)
   - Set maximum price level ($ to $$$$)
   - Filter by open status (All/Open Now/Closed)

4. **Sort Results**
   - Sort by distance (closest first)
   - Sort by rating (highest first)
   - Sort by open status (open first)
   - Sort alphabetically (A-Z)

5. **Interact**
   - Click map markers to select places
   - Click list items to select and pan map
   - View distance to each place
   - See ratings, prices, and open status

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Google Maps JavaScript API** - Map rendering
- **Google Places API** - Nearby places search
- **Google Geocoding API** - Address conversion

## Development Phases

- [x] Phase 1: Project Setup & Structure
- [x] Phase 2: Location Handling
- [x] Phase 3: Google Maps Integration
- [x] Phase 4: Places API Integration
- [x] Phase 5: Filtering Logic
- [x] Phase 6: Sorting Logic
- [x] Phase 7: UI Integration
- [x] Phase 8: Polishing

## API Costs

Google Maps Platform provides **$200 in free credits monthly**, which typically covers:
- 28,000 map loads
- 40,000 geocoding requests
- 17,000 Places API requests

For development and small projects, you'll likely stay within the free tier.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note:** Geolocation requires HTTPS (or localhost for development)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Troubleshooting

### Map not loading
- Check that your API key is correct in `.env`
- Verify all three APIs are enabled (Maps JavaScript, Places, Geocoding)
- Check browser console for specific error messages
- Ensure billing is enabled on your Google Cloud project

### No places found
- Try a different location (some areas have limited place data)
- Check that you're within range (5km radius)
- Verify Places API is enabled and working

### Geolocation not working
- Allow location access in browser settings
- Ensure you're using HTTPS (or localhost)
- Check browser permissions

For more help, see `SETUP_GUIDE.md` or check the browser console for error messages.
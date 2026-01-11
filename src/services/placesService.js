/**
 * Google Places API service
 */

// Common place types/categories
export const PLACE_TYPES = {
  restaurant: 'restaurant',
  cafe: 'cafe',
  bar: 'bar',
  hotel: 'lodging',
  gas_station: 'gas_station',
  pharmacy: 'pharmacy',
  hospital: 'hospital',
  bank: 'bank',
  atm: 'atm',
  shopping_mall: 'shopping_mall',
  store: 'store',
  grocery_or_supermarket: 'grocery_or_supermarket',
  gym: 'gym',
  park: 'park',
  museum: 'museum',
  movie_theater: 'movie_theater',
  night_club: 'night_club',
}

/**
 * Fetch nearby places using Google Places API
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} type - Place type (optional)
 * @param {number} radius - Search radius in meters (default: 5000)
 * @returns {Promise<Array>} Array of place objects
 */
export const fetchNearbyPlaces = (lat, lng, type = null, radius = 5000) => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      reject(new Error('Google Maps Places API not loaded'))
      return
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    )

    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: radius,
      type: type || undefined,
    }

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const places = results.map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity || place.formatted_address,
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          rating: place.rating || null,
          userRatingsTotal: place.user_ratings_total || 0,
          priceLevel: place.price_level || null,
          types: place.types || [],
          photos: place.photos ? place.photos.map((photo) => photo.getUrl()) : [],
          placeId: place.place_id,
          openingHours: place.opening_hours ? place.opening_hours.open_now : null,
          icon: place.icon,
        }))
        resolve(places)
      } else {
        let errorMessage = 'Failed to fetch nearby places'
        if (status === 'ZERO_RESULTS') {
          errorMessage = 'No places found in this area'
        } else if (status === 'OVER_QUERY_LIMIT') {
          errorMessage = 'Places API quota exceeded'
        } else if (status === 'REQUEST_DENIED') {
          errorMessage = 'Places API request denied'
        } else if (status === 'INVALID_REQUEST') {
          errorMessage = 'Invalid request to Places API'
        }
        reject(new Error(errorMessage))
      }
    })
  })
}

/**
 * Get place details by place ID
 * @param {string} placeId - Google Place ID
 * @returns {Promise<Object>} Place details object
 */
export const getPlaceDetails = (placeId) => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      reject(new Error('Google Maps Places API not loaded'))
      return
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    )

    const request = {
      placeId: placeId,
      fields: [
        'name',
        'formatted_address',
        'geometry',
        'rating',
        'user_ratings_total',
        'price_level',
        'types',
        'photos',
        'opening_hours',
        'website',
        'international_phone_number',
        'reviews',
      ],
    }

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        resolve({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          rating: place.rating || null,
          userRatingsTotal: place.user_ratings_total || 0,
          priceLevel: place.price_level || null,
          types: place.types || [],
          photos: place.photos ? place.photos.map((photo) => photo.getUrl()) : [],
          openingHours: place.opening_hours ? place.opening_hours.open_now : null,
          website: place.website || null,
          phone: place.international_phone_number || null,
          reviews: place.reviews || [],
        })
      } else {
        reject(new Error(`Failed to fetch place details: ${status}`))
      }
    })
  })
}
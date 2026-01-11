/**
 * Google Maps service configuration and utilities
 */

// Default map options
export const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }],
    },
  ],
}

// Default map container style
export const mapContainerStyle = {
  width: '100%',
  height: '400px',
}

// Default center (New York City) - will be overridden by user location
export const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
}

/**
 * Geocode an address to coordinates
 * @param {string} address - Address to geocode
 * @param {google.maps.Geocoder} geocoder - Google Maps Geocoder instance
 * @returns {Promise<{lat: number, lng: number}>}
 */
export const geocodeAddress = (address, geocoder) => {
  return new Promise((resolve, reject) => {
    if (!geocoder) {
      reject(new Error('Geocoder not available'))
      return
    }

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location
        resolve({
          lat: location.lat(),
          lng: location.lng(),
        })
      } else {
        reject(new Error(`Geocoding failed: ${status}`))
      }
    })
  })
}

/**
 * Reverse geocode coordinates to address
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {google.maps.Geocoder} geocoder - Google Maps Geocoder instance
 * @returns {Promise<string>}
 */
export const reverseGeocode = (lat, lng, geocoder) => {
  return new Promise((resolve, reject) => {
    if (!geocoder) {
      reject(new Error('Geocoder not available'))
      return
    }

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        resolve(results[0].formatted_address)
      } else {
        reject(new Error(`Reverse geocoding failed: ${status}`))
      }
    })
  })
}
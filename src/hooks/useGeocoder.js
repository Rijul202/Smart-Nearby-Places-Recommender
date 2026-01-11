import { useState, useCallback } from 'react'

/**
 * Custom hook for geocoding addresses using Google Maps Geocoder
 */
const useGeocoder = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const geocodeAddress = useCallback(async (address) => {
    if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
      setError('Google Maps API not loaded')
      return null
    }

    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      const geocoder = new window.google.maps.Geocoder()

      geocoder.geocode({ address }, (results, status) => {
        setLoading(false)

        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location
          resolve({
            lat: location.lat(),
            lng: location.lng(),
            address: results[0].formatted_address,
          })
        } else {
          let errorMessage = 'Unable to geocode address'
          if (status === 'ZERO_RESULTS') {
            errorMessage = 'Address not found'
          } else if (status === 'OVER_QUERY_LIMIT') {
            errorMessage = 'Geocoding quota exceeded'
          } else if (status === 'REQUEST_DENIED') {
            errorMessage = 'Geocoding request denied'
          }
          setError(errorMessage)
          resolve(null)
        }
      })
    })
  }, [])

  return {
    geocodeAddress,
    loading,
    error,
  }
}

export default useGeocoder
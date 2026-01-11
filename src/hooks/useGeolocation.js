import { useState, useEffect } from 'react'

const useGeolocation = () => {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({
          lat: latitude,
          lng: longitude,
        })
        setLoading(false)
      },
      (err) => {
        let errorMessage = 'Unable to retrieve your location'
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user'
            break
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable'
            break
          case err.TIMEOUT:
            errorMessage = 'Location request timed out'
            break
          default:
            errorMessage = 'An unknown error occurred'
            break
        }
        
        setError(errorMessage)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  useEffect(() => {
    // Automatically try to get location on mount
    getCurrentPosition()
  }, [])

  return {
    location,
    error,
    loading,
    getCurrentPosition,
  }
}

export default useGeolocation
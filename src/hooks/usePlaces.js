import { useState, useEffect, useCallback } from 'react'
import { fetchNearbyPlaces } from '../services/placesService'

/**
 * Custom hook for managing nearby places
 */
const usePlaces = (location, placeType = null) => {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadPlaces = useCallback(async () => {
    if (!location || !location.lat || !location.lng) {
      setPlaces([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const nearbyPlaces = await fetchNearbyPlaces(
        location.lat,
        location.lng,
        placeType,
        5000 // 5km radius
      )
      setPlaces(nearbyPlaces)
    } catch (err) {
      setError(err.message)
      setPlaces([])
    } finally {
      setLoading(false)
    }
  }, [location, placeType])

  useEffect(() => {
    loadPlaces()
  }, [loadPlaces])

  return {
    places,
    loading,
    error,
    refetch: loadPlaces,
  }
}

export default usePlaces
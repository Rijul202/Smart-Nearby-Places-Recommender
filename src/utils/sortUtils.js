/**
 * Utility functions for sorting places
 */

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Sort places by open status (open first, then closed, then unknown)
 * @param {Array} places - Array of place objects
 * @returns {Array} Sorted places
 */
export const sortByOpenStatus = (places) => {
  return [...places].sort((a, b) => {
    // Open places first (true = -1, comes first)
    if (a.openingHours === true && b.openingHours !== true) return -1
    if (a.openingHours !== true && b.openingHours === true) return 1
    // Then closed places
    if (a.openingHours === false && b.openingHours === null) return -1
    if (a.openingHours === null && b.openingHours === false) return 1
    return 0
  })
}

/**
 * Sort places by distance from a reference point
 * @param {Array} places - Array of place objects
 * @param {Object} referencePoint - { lat, lng } reference coordinates
 * @returns {Array} Sorted places (closest first)
 */
export const sortByDistance = (places, referencePoint) => {
  if (!referencePoint || !referencePoint.lat || !referencePoint.lng) {
    return places
  }

  return [...places].sort((a, b) => {
    const distA = calculateDistance(
      referencePoint.lat,
      referencePoint.lng,
      a.position.lat,
      a.position.lng
    )
    const distB = calculateDistance(
      referencePoint.lat,
      referencePoint.lng,
      b.position.lat,
      b.position.lng
    )
    return distA - distB
  })
}

/**
 * Sort places by rating (highest first, then by number of ratings)
 * @param {Array} places - Array of place objects
 * @returns {Array} Sorted places
 */
export const sortByRating = (places) => {
  return [...places].sort((a, b) => {
    // Places with no rating go to the end
    if (!a.rating && !b.rating) return 0
    if (!a.rating) return 1
    if (!b.rating) return -1

    // Sort by rating (highest first)
    if (b.rating !== a.rating) {
      return b.rating - a.rating
    }

    // If ratings are equal, sort by number of ratings (more ratings = more reliable)
    return (b.userRatingsTotal || 0) - (a.userRatingsTotal || 0)
  })
}

/**
 * Sort places by name (alphabetical)
 * @param {Array} places - Array of place objects
 * @returns {Array} Sorted places
 */
export const sortByName = (places) => {
  return [...places].sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
}

/**
 * Sort types enum
 */
export const SORT_TYPES = {
  DISTANCE: 'distance',
  RATING: 'rating',
  OPEN_STATUS: 'openStatus',
  NAME: 'name',
}

/**
 * Apply sorting to places based on sort type
 * @param {Array} places - Array of place objects
 * @param {string} sortType - Sort type (from SORT_TYPES)
 * @param {Object} referencePoint - Reference point for distance sorting { lat, lng }
 * @returns {Array} Sorted places
 */
export const applySorting = (places, sortType, referencePoint = null) => {
  if (!sortType || !SORT_TYPES[sortType.toUpperCase()]) {
    return places
  }

  switch (sortType) {
    case SORT_TYPES.DISTANCE:
      return sortByDistance(places, referencePoint)
    case SORT_TYPES.RATING:
      return sortByRating(places)
    case SORT_TYPES.OPEN_STATUS:
      return sortByOpenStatus(places)
    case SORT_TYPES.NAME:
      return sortByName(places)
    default:
      return places
  }
}
/**
 * Utility functions for filtering places
 */

/**
 * Filter places based on rating threshold
 * @param {Array} places - Array of place objects
 * @param {number|null} minRating - Minimum rating (1-5) or null to skip
 * @returns {Array} Filtered places
 */
export const filterByRating = (places, minRating) => {
  if (!minRating || minRating < 1 || minRating > 5) {
    return places
  }

  return places.filter((place) => {
    if (!place.rating) return false
    return place.rating >= minRating
  })
}

/**
 * Filter places based on price level
 * @param {Array} places - Array of place objects
 * @param {number|null} maxPriceLevel - Maximum price level (1-4) or null to skip
 * @returns {Array} Filtered places
 */
export const filterByPrice = (places, maxPriceLevel) => {
  if (!maxPriceLevel || maxPriceLevel < 1 || maxPriceLevel > 4) {
    return places
  }

  return places.filter((place) => {
    // If place has no price level, include it (some places don't have price info)
    if (place.priceLevel === null || place.priceLevel === undefined) {
      return true
    }
    return place.priceLevel <= maxPriceLevel
  })
}

/**
 * Filter places based on open status
 * @param {Array} places - Array of place objects
 * @param {boolean|null} isOpen - true for open only, false for closed only, null for all
 * @returns {Array} Filtered places
 */
export const filterByOpenStatus = (places, isOpen) => {
  if (isOpen === null || isOpen === undefined) {
    return places
  }

  return places.filter((place) => {
    // If place has no opening hours info, include it
    if (place.openingHours === null || place.openingHours === undefined) {
      return true
    }
    return place.openingHours === isOpen
  })
}

/**
 * Apply all filters to places
 * @param {Array} places - Array of place objects
 * @param {Object} filters - Filter object with { minRating, maxPriceLevel, isOpen }
 * @returns {Array} Filtered places
 */
export const applyFilters = (places, filters) => {
  let filtered = places

  if (filters.minRating) {
    filtered = filterByRating(filtered, filters.minRating)
  }

  if (filters.maxPriceLevel) {
    filtered = filterByPrice(filtered, filters.maxPriceLevel)
  }

  if (filters.isOpen !== null && filters.isOpen !== undefined) {
    filtered = filterByOpenStatus(filtered, filters.isOpen)
  }

  return filtered
}
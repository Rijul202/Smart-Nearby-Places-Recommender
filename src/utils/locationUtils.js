/**
 * Validates if coordinates are valid latitude and longitude values
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {boolean}
 */
export const validateCoordinates = (lat, lng) => {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return false
  }
  
  if (isNaN(lat) || isNaN(lng)) {
    return false
  }
  
  // Latitude must be between -90 and 90
  if (lat < -90 || lat > 90) {
    return false
  }
  
  // Longitude must be between -180 and 180
  if (lng < -180 || lng > 180) {
    return false
  }
  
  return true
}

/**
 * Parses coordinate string input (e.g., "40.7128, -74.0060")
 * @param {string} coordString - Coordinate string
 * @returns {Object|null} - { lat, lng } or null if invalid
 */
export const parseCoordinateString = (coordString) => {
  if (!coordString || typeof coordString !== 'string') {
    return null
  }
  
  const parts = coordString.split(',').map(part => part.trim())
  
  if (parts.length !== 2) {
    return null
  }
  
  const lat = parseFloat(parts[0])
  const lng = parseFloat(parts[1])
  
  if (!validateCoordinates(lat, lng)) {
    return null
  }
  
  return { lat, lng }
}

/**
 * Formats coordinates as a readable string
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {string}
 */
export const formatCoordinates = (lat, lng) => {
  if (!validateCoordinates(lat, lng)) {
    return ''
  }
  
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
}
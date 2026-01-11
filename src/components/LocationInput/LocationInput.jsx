import { useState } from 'react'
import useGeocoder from '../../hooks/useGeocoder'
import './LocationInput.css'

const LocationInput = ({ onLocationSubmit, disabled = false }) => {
  const [inputType, setInputType] = useState('address') // 'address' or 'coordinates'
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [error, setError] = useState('')
  const { geocodeAddress, loading: geocodingLoading, error: geocodingError } = useGeocoder()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (inputType === 'address') {
      if (!address.trim()) {
        setError('Please enter an address')
        return
      }
      
      // Geocode the address
      const geocodedLocation = await geocodeAddress(address.trim())
      if (geocodedLocation) {
        onLocationSubmit({
          lat: geocodedLocation.lat,
          lng: geocodedLocation.lng,
          address: geocodedLocation.address,
          type: 'address',
        })
      } else {
        setError(geocodingError || 'Could not find the address. Please try a different address or use coordinates.')
      }
    } else {
      if (!coordinates.trim()) {
        setError('Please enter coordinates')
        return
      }
      
      // Parse coordinates (e.g., "40.7128, -74.0060")
      const parts = coordinates.split(',').map(part => part.trim())
      if (parts.length !== 2) {
        setError('Invalid format. Please use: latitude, longitude (e.g., 40.7128, -74.0060)')
        return
      }
      
      const lat = parseFloat(parts[0])
      const lng = parseFloat(parts[1])
      
      if (isNaN(lat) || isNaN(lng)) {
        setError('Coordinates must be valid numbers')
        return
      }
      
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        setError('Invalid coordinates. Latitude: -90 to 90, Longitude: -180 to 180')
        return
      }
      
      onLocationSubmit({ lat, lng, type: 'coordinates' })
    }
  }

  return (
    <div className="location-input">
      <div className="location-input__tabs">
        <button
          type="button"
          className={`location-input__tab ${inputType === 'address' ? 'active' : ''}`}
          onClick={() => {
            setInputType('address')
            setError('')
          }}
          disabled={disabled}
        >
          Address
        </button>
        <button
          type="button"
          className={`location-input__tab ${inputType === 'coordinates' ? 'active' : ''}`}
          onClick={() => {
            setInputType('coordinates')
            setError('')
          }}
          disabled={disabled}
        >
          Coordinates
        </button>
      </div>

      <form onSubmit={handleSubmit} className="location-input__form">
        {inputType === 'address' ? (
          <div className="location-input__field">
            <label htmlFor="address-input">Enter Address</label>
            <input
              id="address-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., New York, NY or 123 Main St, City"
              disabled={disabled}
              className="location-input__input"
            />
          </div>
        ) : (
          <div className="location-input__field">
            <label htmlFor="coordinates-input">Enter Coordinates</label>
            <input
              id="coordinates-input"
              type="text"
              value={coordinates}
              onChange={(e) => setCoordinates(e.target.value)}
              placeholder="e.g., 40.7128, -74.0060"
              disabled={disabled}
              className="location-input__input"
            />
          </div>
        )}

        {error && <div className="location-input__error">{error}</div>}

        <button
          type="submit"
          disabled={disabled || geocodingLoading}
          className="location-input__submit"
        >
          {geocodingLoading ? 'Geocoding...' : 'Use This Location'}
        </button>
      </form>
    </div>
  )
}

export default LocationInput
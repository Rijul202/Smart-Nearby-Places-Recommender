import { useState, useEffect } from 'react'
import useGeolocation from '../../hooks/useGeolocation'
import LocationInput from '../LocationInput/LocationInput'
import './LocationHandler.css'

const LocationHandler = ({ onLocationChange }) => {
  const { location: geoLocation, error: geoError, loading: geoLoading, getCurrentPosition } = useGeolocation()
  const [manualLocation, setManualLocation] = useState(null)
  const [showManualInput, setShowManualInput] = useState(false)

  // Determine which location to use
  const currentLocation = manualLocation || geoLocation

  // Notify parent when automatic location is detected
  useEffect(() => {
    if (geoLocation && !manualLocation && onLocationChange) {
      onLocationChange(geoLocation)
    }
  }, [geoLocation, manualLocation, onLocationChange])

  // Notify parent component when location changes (manual)
  const handleLocationChange = (location) => {
    if (location) {
      setManualLocation(location)
      setShowManualInput(false)
      if (onLocationChange) {
        onLocationChange(location)
      }
    }
  }

  // Handle manual location submission
  const handleManualLocationSubmit = (locationData) => {
    handleLocationChange(locationData)
  }

  // Handle retry geolocation
  const handleRetryGeolocation = () => {
    getCurrentPosition()
    setShowManualInput(false)
    setManualLocation(null)
  }

  return (
    <div className="location-handler">
      {/* Automatic geolocation status */}
      {!manualLocation && (
        <div className="location-handler__auto-status">
          {geoLoading && (
            <div className="location-handler__status location-handler__status--loading">
              <span className="location-handler__spinner"></span>
              <span>Detecting your location...</span>
            </div>
          )}
          
          {geoError && !showManualInput && !manualLocation && (
            <div className="location-handler__status location-handler__status--error">
              <span>⚠️ {geoError}</span>
              <button
                onClick={() => setShowManualInput(true)}
                className="location-handler__action-btn"
              >
                Enter Location Manually
              </button>
            </div>
          )}
          
          {geoLocation && !geoError && (
            <div className="location-handler__status location-handler__status--success">
              <span>✓ Location detected: {geoLocation.lat.toFixed(4)}, {geoLocation.lng.toFixed(4)}</span>
              <button
                onClick={() => setShowManualInput(true)}
                className="location-handler__action-btn location-handler__action-btn--secondary"
              >
                Change Location
              </button>
            </div>
          )}
        </div>
      )}

      {/* Manual location input */}
      {(showManualInput || manualLocation) && (
        <div className="location-handler__manual">
          {manualLocation && (
            <div className="location-handler__status location-handler__status--success">
              <span>
                ✓ Using manual location: {
                  manualLocation.lat && manualLocation.lng
                    ? `${manualLocation.lat.toFixed(4)}, ${manualLocation.lng.toFixed(4)}`
                    : manualLocation.address
                }
              </span>
              <div className="location-handler__actions">
                <button
                  onClick={() => setShowManualInput(true)}
                  className="location-handler__action-btn location-handler__action-btn--secondary"
                >
                  Change
                </button>
                {!geoError && (
                  <button
                    onClick={handleRetryGeolocation}
                    className="location-handler__action-btn location-handler__action-btn--secondary"
                  >
                    Use My Location
                  </button>
                )}
              </div>
            </div>
          )}
          
          {showManualInput && (
            <LocationInput
              onLocationSubmit={handleManualLocationSubmit}
              disabled={geoLoading}
            />
          )}
        </div>
      )}

      {/* Display current location info */}
      {currentLocation && (
        <div className="location-handler__current">
          <h3>Current Location</h3>
          <div className="location-handler__coordinates">
            {currentLocation.lat && currentLocation.lng ? (
              <>
                <div><strong>Latitude:</strong> {currentLocation.lat.toFixed(6)}</div>
                <div><strong>Longitude:</strong> {currentLocation.lng.toFixed(6)}</div>
              </>
            ) : (
              <div><strong>Address:</strong> {currentLocation.address}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationHandler
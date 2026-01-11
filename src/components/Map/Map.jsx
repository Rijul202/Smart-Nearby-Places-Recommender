import { useMemo, useState, useCallback, useEffect } from 'react'
import { GoogleMap, Marker, LoadScript, useJsApiLoader } from '@react-google-maps/api'
import './Map.css'

const libraries = ['places']

const Map = ({ center, zoom = 14, markers = [], onMapClick, selectedMarker = null }) => {
  const [map, setMap] = useState(null)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
    libraries,
  })

  const mapOptions = useMemo(
    () => ({
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
    }),
    []
  )

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  // Pan map to selected marker
  useEffect(() => {
    if (map && selectedMarker && markers.length > 0) {
      const selectedPlace = markers.find((m) => m.id === selectedMarker)
      if (selectedPlace && selectedPlace.position) {
        map.panTo(selectedPlace.position)
        // Slight zoom in for better visibility
        map.setZoom(Math.max(15, map.getZoom()))
      }
    }
  }, [map, selectedMarker, markers])

  if (loadError) {
    return (
      <div className="map-error">
        <p>Error loading Google Maps. Please check your API key.</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="map-loading">
        <div className="map-loading__spinner"></div>
        <p>Loading map...</p>
      </div>
    )
  }

  if (!center || (!center.lat && !center.lng)) {
    return (
      <div className="map-error">
        <p>No location available to display on map.</p>
      </div>
    )
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerClassName="map-container__google-map"
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={mapOptions}
      >
        {/* User location marker */}
        {center && (
          <Marker
            position={center}
            title="Your Location"
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
            }}
            zIndex={1000}
          />
        )}

        {/* Additional markers (for places in Phase 4) */}
        {markers.map((marker, index) => (
          <Marker
            key={marker.id || index}
            position={marker.position}
            title={marker.title}
            onClick={marker.onClick}
            icon={
              selectedMarker === marker.id
                ? {
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  }
                : undefined
            }
          />
        ))}
      </GoogleMap>
    </div>
  )
}

export default Map
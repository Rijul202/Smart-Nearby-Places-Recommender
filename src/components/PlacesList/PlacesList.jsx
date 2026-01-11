import { useEffect, useRef } from 'react'
import './PlacesList.css'

const PlacesList = ({ places, loading, error, onPlaceSelect, selectedPlaceId = null, userLocation = null }) => {
  const selectedItemRef = useRef(null)
  const listContainerRef = useRef(null)

  const formatRating = (rating) => {
    if (!rating) return 'N/A'
    return rating.toFixed(1)
  }

  const formatPriceLevel = (priceLevel) => {
    if (priceLevel === null || priceLevel === undefined) return ''
    return '$'.repeat(priceLevel)
  }

  const getOpenStatus = (isOpen) => {
    if (isOpen === null || isOpen === undefined) return null
    return isOpen ? 'Open' : 'Closed'
  }

  // Calculate distance from user location
  const calculateDistance = (placeLat, placeLng) => {
    if (!userLocation || !userLocation.lat || !userLocation.lng) return null
    
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((placeLat - userLocation.lat) * Math.PI) / 180
    const dLng = ((placeLng - userLocation.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((placeLat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const formatDistance = (distance) => {
    if (!distance) return null
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} m`
    }
    return `${distance.toFixed(2)} km`
  }

  // Scroll to selected item when selection changes
  useEffect(() => {
    if (selectedPlaceId && selectedItemRef.current && listContainerRef.current) {
      const itemElement = selectedItemRef.current
      const containerElement = listContainerRef.current
      
      // Calculate position relative to container
      const containerRect = containerElement.getBoundingClientRect()
      const itemRect = itemElement.getBoundingClientRect()
      
      // Scroll to center the item in the viewport
      const scrollTop = containerElement.scrollTop
      const itemOffsetTop = itemElement.offsetTop
      const containerHeight = containerElement.clientHeight
      const itemHeight = itemElement.offsetHeight
      
      const targetScroll = itemOffsetTop - containerHeight / 2 + itemHeight / 2
      
      containerElement.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })
    }
  }, [selectedPlaceId])

  if (loading) {
    return (
      <div className="places-list places-list--loading">
        <div className="places-list__spinner"></div>
        <p>Loading places...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="places-list places-list--error">
        <p>⚠️ {error}</p>
      </div>
    )
  }

  if (places.length === 0) {
    return (
      <div className="places-list places-list--empty">
        <p>No places found in this area.</p>
      </div>
    )
  }

  return (
    <div className="places-list">
      <div className="places-list__header">
        <h3>Nearby Places ({places.length})</h3>
      </div>
      <div className="places-list__items" ref={listContainerRef}>
        {places.map((place) => {
          const distance = calculateDistance(place.position.lat, place.position.lng)
          const isSelected = selectedPlaceId === place.id
          
          return (
            <div
              key={place.id}
              ref={isSelected ? selectedItemRef : null}
              className={`places-list__item ${
                isSelected ? 'places-list__item--selected' : ''
              }`}
              onClick={() => onPlaceSelect && onPlaceSelect(place)}
            >
              <div className="places-list__item-content">
                <div className="places-list__item-header">
                  <h4 className="places-list__item-name">{place.name}</h4>
                  {distance !== null && (
                    <div className="places-list__item-distance">
                      📍 {formatDistance(distance)}
                    </div>
                  )}
                </div>
                <p className="places-list__item-address">{place.address}</p>
                
                <div className="places-list__item-details">
                  {place.rating && (
                    <div className="places-list__item-rating">
                      <span className="places-list__item-rating-star">⭐</span>
                      <span>{formatRating(place.rating)}</span>
                      {place.userRatingsTotal > 0 && (
                        <span className="places-list__item-rating-count">
                          ({place.userRatingsTotal})
                        </span>
                      )}
                    </div>
                  )}
                  
                  {place.priceLevel !== null && place.priceLevel !== undefined && (
                    <div className="places-list__item-price">
                      {formatPriceLevel(place.priceLevel)}
                    </div>
                  )}
                  
                  {place.openingHours !== null && place.openingHours !== undefined && (
                    <div
                      className={`places-list__item-status ${
                        place.openingHours
                          ? 'places-list__item-status--open'
                          : 'places-list__item-status--closed'
                      }`}
                    >
                      {getOpenStatus(place.openingHours)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlacesList
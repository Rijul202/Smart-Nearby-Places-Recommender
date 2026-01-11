import { useState, useMemo } from 'react'
import LocationHandler from '../LocationHandler/LocationHandler'
import Map from '../Map/Map'
import PlaceTypeSelector from '../PlaceTypeSelector/PlaceTypeSelector'
import PlacesList from '../PlacesList/PlacesList'
import Filters from '../Filters/Filters'
import SortSelector from '../SortSelector/SortSelector'
import usePlaces from '../../hooks/usePlaces'
import { applyFilters } from '../../utils/filterUtils'
import { applySorting } from '../../utils/sortUtils'
import './Layout.css'

const Layout = () => {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [selectedPlaceType, setSelectedPlaceType] = useState(null)
  const [selectedPlaceId, setSelectedPlaceId] = useState(null)
  const [filters, setFilters] = useState({
    minRating: null,
    maxPriceLevel: null,
    isOpen: null,
  })
  const [sortType, setSortType] = useState(null)

  const handleLocationChange = (location) => {
    setCurrentLocation(location)
    setSelectedPlaceId(null) // Reset selection when location changes
  }

  // Get map center coordinates
  const getMapCenter = () => {
    if (!currentLocation) return null
    
    if (currentLocation.lat && currentLocation.lng) {
      return {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      }
    }
    
    return null
  }

  const mapCenter = getMapCenter()
  
  // Fetch places based on location and selected type
  const { places, loading: placesLoading, error: placesError } = usePlaces(
    mapCenter,
    selectedPlaceType
  )

  // Apply filters to places
  const filteredPlaces = useMemo(() => {
    return applyFilters(places, filters)
  }, [places, filters])

  // Apply sorting to filtered places
  const sortedPlaces = useMemo(() => {
    return applySorting(filteredPlaces, sortType, mapCenter)
  }, [filteredPlaces, sortType, mapCenter])

  // Convert sorted places to map markers
  const mapMarkers = useMemo(() => {
    return sortedPlaces.map((place) => ({
      id: place.id,
      position: place.position,
      title: place.name,
      onClick: () => setSelectedPlaceId(place.id),
    }))
  }, [sortedPlaces])

  const handlePlaceSelect = (place) => {
    setSelectedPlaceId(place.id)
  }

  return (
    <div className="layout">
      <header className="layout__header">
        <h1>Smart Nearby Places Recommender</h1>
        <p>Discover the best places around you</p>
      </header>
      
      <main className="layout__main">
        <div className="layout__content">
          <LocationHandler onLocationChange={handleLocationChange} />
          
          {/* Place type selector and map */}
          {mapCenter && (
            <>
              <div className="layout__places-section">
                <PlaceTypeSelector
                  selectedType={selectedPlaceType}
                  onTypeChange={setSelectedPlaceType}
                  disabled={placesLoading}
                />
                
                <div className="layout__map-container">
                  <Map
                    center={mapCenter}
                    zoom={14}
                    markers={mapMarkers}
                    selectedMarker={selectedPlaceId}
                  />
                </div>
              </div>

              {/* Filters */}
              <Filters
                filters={filters}
                onFiltersChange={setFilters}
                disabled={placesLoading}
              />

              {/* Sort selector */}
              <SortSelector
                selectedSort={sortType}
                onSortChange={setSortType}
                disabled={placesLoading}
              />

              {/* Places list */}
              <div className="layout__places-list-container">
                <PlacesList
                  places={sortedPlaces}
                  loading={placesLoading}
                  error={placesError}
                  onPlaceSelect={handlePlaceSelect}
                  selectedPlaceId={selectedPlaceId}
                  userLocation={mapCenter}
                />
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="layout__footer">
        <p>&copy; 2024 Smart Nearby Places Recommender</p>
      </footer>
    </div>
  )
}

export default Layout
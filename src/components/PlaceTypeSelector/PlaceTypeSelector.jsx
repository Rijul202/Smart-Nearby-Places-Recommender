import './PlaceTypeSelector.css'
import { PLACE_TYPES } from '../../services/placesService'

const PLACE_TYPE_LABELS = {
  [PLACE_TYPES.restaurant]: 'Restaurants',
  [PLACE_TYPES.cafe]: 'Cafes',
  [PLACE_TYPES.bar]: 'Bars',
  [PLACE_TYPES.hotel]: 'Hotels',
  [PLACE_TYPES.gas_station]: 'Gas Stations',
  [PLACE_TYPES.pharmacy]: 'Pharmacies',
  [PLACE_TYPES.hospital]: 'Hospitals',
  [PLACE_TYPES.bank]: 'Banks',
  [PLACE_TYPES.atm]: 'ATMs',
  [PLACE_TYPES.shopping_mall]: 'Shopping Malls',
  [PLACE_TYPES.store]: 'Stores',
  [PLACE_TYPES.grocery_or_supermarket]: 'Groceries',
  [PLACE_TYPES.gym]: 'Gyms',
  [PLACE_TYPES.park]: 'Parks',
  [PLACE_TYPES.museum]: 'Museums',
  [PLACE_TYPES.movie_theater]: 'Movie Theaters',
  [PLACE_TYPES.night_club]: 'Night Clubs',
}

const PlaceTypeSelector = ({ selectedType, onTypeChange, disabled = false }) => {
  return (
    <div className="place-type-selector">
      <label htmlFor="place-type-select" className="place-type-selector__label">
        Filter by Type:
      </label>
      <select
        id="place-type-select"
        value={selectedType || ''}
        onChange={(e) => onTypeChange(e.target.value || null)}
        disabled={disabled}
        className="place-type-selector__select"
        aria-label="Filter places by type"
      >
        <option value="">All Places</option>
        {Object.entries(PLACE_TYPE_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PlaceTypeSelector
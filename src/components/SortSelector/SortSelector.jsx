import './SortSelector.css'
import { SORT_TYPES } from '../../utils/sortUtils'

const SORT_OPTIONS = [
  { value: SORT_TYPES.OPEN_STATUS, label: 'Open Status (Open First)' },
  { value: SORT_TYPES.DISTANCE, label: 'Distance (Closest First)' },
  { value: SORT_TYPES.RATING, label: 'Rating (Highest First)' },
  { value: SORT_TYPES.NAME, label: 'Name (A-Z)' },
]

const SortSelector = ({ selectedSort, onSortChange, disabled = false }) => {
  return (
    <div className="sort-selector">
      <label htmlFor="sort-select" className="sort-selector__label">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={selectedSort || ''}
        onChange={(e) => onSortChange(e.target.value || null)}
        disabled={disabled}
        className="sort-selector__select"
        aria-label="Sort places"
      >
        <option value="">Default Order</option>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortSelector
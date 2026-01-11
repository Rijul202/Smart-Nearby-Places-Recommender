import './Filters.css'

const Filters = ({ filters, onFiltersChange, disabled = false }) => {
  const { minRating, maxPriceLevel, isOpen } = filters

  const handleRatingChange = (e) => {
    const value = e.target.value === '' ? null : parseFloat(e.target.value)
    onFiltersChange({ ...filters, minRating: value })
  }

  const handlePriceChange = (e) => {
    const value = e.target.value === '' ? null : parseInt(e.target.value)
    onFiltersChange({ ...filters, maxPriceLevel: value })
  }

  const handleOpenStatusChange = (e) => {
    const value = e.target.value === '' ? null : e.target.value === 'true'
    onFiltersChange({ ...filters, isOpen: value })
  }

  const handleClearFilters = () => {
    onFiltersChange({
      minRating: null,
      maxPriceLevel: null,
      isOpen: null,
    })
  }

  const hasActiveFilters = minRating !== null || maxPriceLevel !== null || isOpen !== null

  return (
    <div className="filters">
      <div className="filters__header">
        <h3 className="filters__title">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="filters__clear-btn"
            disabled={disabled}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="filters__content">
        {/* Rating Filter */}
        <div className="filters__group">
          <label htmlFor="rating-filter" className="filters__label">
            Minimum Rating
          </label>
          <select
            id="rating-filter"
            value={minRating || ''}
            onChange={handleRatingChange}
            disabled={disabled}
            className="filters__select"
            aria-label="Filter by minimum rating"
          >
            <option value="">Any Rating</option>
            <option value="4.5">4.5+ ⭐</option>
            <option value="4.0">4.0+ ⭐</option>
            <option value="3.5">3.5+ ⭐</option>
            <option value="3.0">3.0+ ⭐</option>
          </select>
        </div>

        {/* Price Level Filter */}
        <div className="filters__group">
          <label htmlFor="price-filter" className="filters__label">
            Maximum Price Level
          </label>
          <select
            id="price-filter"
            value={maxPriceLevel || ''}
            onChange={handlePriceChange}
            disabled={disabled}
            className="filters__select"
            aria-label="Filter by maximum price level"
          >
            <option value="">Any Price</option>
            <option value="1">$ (Budget)</option>
            <option value="2">$$ (Moderate)</option>
            <option value="3">$$$ (Expensive)</option>
            <option value="4">$$$$ (Very Expensive)</option>
          </select>
        </div>

        {/* Open Status Filter */}
        <div className="filters__group">
          <label htmlFor="open-status-filter" className="filters__label">
            Open Status
          </label>
          <select
            id="open-status-filter"
            value={isOpen === null ? '' : isOpen.toString()}
            onChange={handleOpenStatusChange}
            disabled={disabled}
            className="filters__select"
            aria-label="Filter by open status"
          >
            <option value="">All</option>
            <option value="true">Open Now</option>
            <option value="false">Closed</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="filters__active-count">
          <span>Active filters applied</span>
        </div>
      )}
    </div>
  )
}

export default Filters
import { categoryOptions } from '../constants';

function FilterBar({
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onSubmit,
  onReset,
}) {
  return (
    <form className="filter-bar" onSubmit={onSubmit}>
      <input
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search product name"
      />

      <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
        <option value="">All Categories</option>
        {categoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button className="primary-button" type="submit">
        Apply
      </button>
      <button className="ghost-button" type="button" onClick={onReset}>
        Reset
      </button>
    </form>
  );
}

export default FilterBar;

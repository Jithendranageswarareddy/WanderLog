export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar" htmlFor="country-search">
      <span className="search-icon" aria-hidden="true">
        🔎
      </span>
      <input
        id="country-search"
        type="search"
        className="search-input"
        placeholder="Search countries..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export default function RegionFilter({ value, onChange }) {
  return (
    <div className="region-filter" role="tablist" aria-label="Region filter">
      {regions.map((region) => (
        <button
          key={region}
          type="button"
          className={value === region ? 'region-pill active' : 'region-pill'}
          onClick={() => onChange(region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
}

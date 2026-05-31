import CountryCard from './CountryCard';

export default function CountryGrid({ countries, draggable = false, draggedCode, onDragStart, onDragOver, onDrop }) {
  if (!countries.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-illustration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <h3>No countries matched your search.</h3>
        <p>Try a different country name or reset the region filter.</p>
      </div>
    );
  }

  return (
    <div className="country-grid">
      {countries.map((country) => (
        <CountryCard
          key={country.code}
          country={country}
          draggable={draggable}
          draggedCode={draggedCode}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}

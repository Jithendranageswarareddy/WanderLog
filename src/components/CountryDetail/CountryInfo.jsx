function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value || 0);
}

export default function CountryInfo({ country }) {
  if (!country) {
    return null;
  }

  return (
    <section className="country-detail-card">
      <div className="country-detail-hero">
        <img className="country-detail-flag" src={country.flag} alt={`Flag of ${country.name}`} />
        <div>
          <h1 className="country-detail-title">{country.name}</h1>
          <p className="country-detail-subtitle">{country.capital}</p>
        </div>
      </div>

      <div className="country-info-grid">
        <div className="info-tile">
          <span className="info-label">Capital</span>
          <strong>{country.capital}</strong>
        </div>
        <div className="info-tile">
          <span className="info-label">Population</span>
          <strong>{formatNumber(country.population)}</strong>
        </div>
        <div className="info-tile">
          <span className="info-label">Region</span>
          <strong>{country.region}</strong>
        </div>
        <div className="info-tile">
          <span className="info-label">Area</span>
          <strong>{formatNumber(country.area)} km²</strong>
        </div>
        <div className="info-tile">
          <span className="info-label">Languages</span>
          <strong>{country.languages}</strong>
        </div>
        <div className="info-tile">
          <span className="info-label">Currencies</span>
          <strong>{country.currencies}</strong>
        </div>
        <div className="info-tile">
          <span className="info-label">Timezone</span>
          <strong>{country.timezone}</strong>
        </div>
        <div className="info-tile">
          <span className="info-label">Borders</span>
          <strong>{country.borders}</strong>
        </div>
        <div className="info-tile">
          <span className="info-label">Independent</span>
          <strong>{country.independent ? 'Yes' : 'No'}</strong>
        </div>
      </div>

      <div className="country-links">
        {country.maps.googleMaps ? (
          <a href={country.maps.googleMaps} target="_blank" rel="noreferrer">
            Google Maps
          </a>
        ) : null}
        {country.maps.openStreetMaps ? (
          <a href={country.maps.openStreetMaps} target="_blank" rel="noreferrer">
            OpenStreetMap
          </a>
        ) : null}
      </div>
    </section>
  );
}

import { useContext } from 'react';
import Loader from '../components/Layout/Loader';
import SearchBar from '../components/Explore/SearchBar';
import RegionFilter from '../components/Explore/RegionFilter';
import CountryGrid from '../components/Explore/CountryGrid';
import useCountries from '../hooks/useCountries';
import BucketListContext from '../context/bucketListContextValue';

function StatCard({ label, value }) {
  return (
    <article className="stat-card">
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
    </article>
  );
}

function formatPopulation(value) {
  return new Intl.NumberFormat('en-US').format(value || 0);
}

export default function ExplorePage() {
  const { filteredCountries, loading, error, retry, search, setSearch, region, setRegion, sortBy, setSortBy } = useCountries();
  const { wishlistCount, visitedCount, wishlistPopulation } = useContext(BucketListContext);

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Explore</p>
          <h1>Browse countries and build your bucket list.</h1>
          <p className="page-lead">Search by country name, filter by region, sort your results, and open a country for deeper details.</p>
        </div>

        <div className="stats-grid">
          <StatCard label="Wishlist Countries" value={wishlistCount} />
          <StatCard label="Visited Countries" value={visitedCount} />
          <StatCard label="Population Covered" value={formatPopulation(wishlistPopulation)} />
        </div>
      </section>

      <section className="controls-bar">
        <SearchBar value={search} onChange={setSearch} />
        <RegionFilter value={region} onChange={setRegion} />
        <label className="sort-select-wrap" htmlFor="sort-countries">
          <span>Sort by</span>
          <select id="sort-countries" className="sort-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="name">Name</option>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </label>
      </section>

      {loading ? (
        <Loader fullPage label="Loading countries..." />
      ) : error ? (
        <div className="error-panel">
          <h3>Countries could not be loaded.</h3>
          <p>{error}</p>
          <button type="button" className="primary-button" onClick={retry}>
            Retry
          </button>
        </div>
      ) : (
        <CountryGrid countries={filteredCountries} />
      )}
    </div>
  );
}

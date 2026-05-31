import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import BucketListContext from '../../context/bucketListContextValue';

function formatPopulation(value) {
  return new Intl.NumberFormat('en-US').format(value || 0);
}

export default function CountryCard({ country, draggable = false, draggedCode, onDragStart, onDragOver, onDrop }) {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, markVisited, removeVisited, isInWishlist, isVisited } = useContext(BucketListContext);
  const wishlistActive = isInWishlist(country.code);
  const visitedActive = isVisited(country.code);

  const handleCardClick = () => {
    navigate(`/country/${country.code}`);
  };

  const toggleWishlist = (event) => {
    event.stopPropagation();
    if (wishlistActive) {
      removeFromWishlist(country.code);
      return;
    }
    addToWishlist(country);
  };

  const toggleVisited = (event) => {
    event.stopPropagation();
    if (visitedActive) {
      removeVisited(country.code);
      return;
    }
    markVisited(country);
  };

  return (
    <article
      className={draggedCode === country.code ? 'country-card dragging' : 'country-card'}
      role="button"
      tabIndex={0}
      draggable={draggable}
      onClick={handleCardClick}
      onKeyDown={(event) => event.key === 'Enter' && handleCardClick()}
      onDragStart={(event) => onDragStart?.(event, country.code)}
      onDragOver={(event) => onDragOver?.(event, country.code)}
      onDrop={(event) => onDrop?.(event, country.code)}
    >
      <div className="country-flag-wrap">
        <img className="country-flag" src={country.flag} alt={`Flag of ${country.name}`} loading="lazy" />
      </div>

      <div className="country-card-body">
        <h3 className="country-name">{country.name}</h3>
        <p className="country-meta">Capital: {country.capital}</p>
        <p className="country-meta">Population: {formatPopulation(country.population)}</p>
        <p className="country-meta">Region: {country.region}</p>
      </div>

      <div className="country-card-actions">
        <button type="button" className={wishlistActive ? 'icon-action active' : 'icon-action'} onClick={toggleWishlist} aria-label={wishlistActive ? 'Remove from Bucket List' : 'Add to Bucket List'}>
          <span aria-hidden="true">{wishlistActive ? '❤️' : '🤍'}</span>
          <span>{wishlistActive ? 'Saved' : 'Bucket'}</span>
        </button>
        <button type="button" className={visitedActive ? 'icon-action active visited' : 'icon-action visited'} onClick={toggleVisited} aria-label={visitedActive ? 'Remove from visited' : 'Mark visited'}>
          <span aria-hidden="true">{visitedActive ? '✔' : '✓'}</span>
          <span>{visitedActive ? 'Visited' : 'Visit'}</span>
        </button>
      </div>
    </article>
  );
}

import { useContext } from 'react';
import BucketListContext from '../../context/bucketListContextValue';

export default function ActionButtons({ country }) {
  const { addToWishlist, removeFromWishlist, markVisited, removeVisited, isInWishlist, isVisited } = useContext(BucketListContext);
  const wishlistActive = isInWishlist(country.code);
  const visitedActive = isVisited(country.code);

  return (
    <div className="detail-actions">
      <button type="button" className={wishlistActive ? 'primary-button danger' : 'primary-button'} onClick={() => (wishlistActive ? removeFromWishlist(country.code) : addToWishlist(country))}>
        {wishlistActive ? 'Remove From Bucket List' : 'Add To Bucket List'}
      </button>
      <button type="button" className={visitedActive ? 'secondary-button visited' : 'secondary-button'} onClick={() => (visitedActive ? removeVisited(country.code) : markVisited(country))}>
        {visitedActive ? 'Remove Visited' : 'Mark Visited'}
      </button>
    </div>
  );
}

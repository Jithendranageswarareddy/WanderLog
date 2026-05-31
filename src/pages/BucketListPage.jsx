import { useState, useMemo, useContext } from 'react';
import BucketListTabs from '../components/BucketList/BucketListTabs';
import CountryGrid from '../components/Explore/CountryGrid';
import BucketListContext from '../context/bucketListContextValue';

function EmptyState({ title, description }) {
  return (
    <div className="empty-state bucket-empty">
      <div className="empty-state-illustration bucket-illustration" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function BucketListPage() {
  const { wishlist, visited, wishlistCount, visitedCount, reorderWishlist, reorderVisited } = useContext(BucketListContext);
  const [activeTab, setActiveTab] = useState('wishlist');
  const [draggedCode, setDraggedCode] = useState('');

  const activeCountries = useMemo(() => {
    return activeTab === 'wishlist' ? wishlist : visited;
  }, [activeTab, visited, wishlist]);

  const handleDragStart = (event, code) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', code);
    setDraggedCode(code);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event, targetCode) => {
    event.preventDefault();
    const sourceCode = event.dataTransfer.getData('text/plain');

    if (!sourceCode || sourceCode === targetCode) {
      setDraggedCode('');
      return;
    }

    if (activeTab === 'wishlist') {
      reorderWishlist(sourceCode, targetCode);
    } else {
      reorderVisited(sourceCode, targetCode);
    }

    setDraggedCode('');
  };

  return (
    <div className="page-stack">
      <section className="page-hero bucket-hero">
        <div>
          <p className="eyebrow">Bucket List</p>
          <h1>Track your wishlist and visited countries.</h1>
          <p className="page-lead">Keep your travel goals and progress organized in LocalStorage so they survive refreshes and deploys.</p>
        </div>
      </section>

      <BucketListTabs activeTab={activeTab} onChange={setActiveTab} wishlistCount={wishlistCount} visitedCount={visitedCount} />

      {activeCountries.length ? (
        <CountryGrid
          countries={activeCountries}
          draggable
          draggedCode={draggedCode}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ) : activeTab === 'wishlist' ? (
        <EmptyState title="Your wishlist is empty." description="Add countries from Explore or the detail page to start planning your next trip." />
      ) : (
        <EmptyState title="No visited countries yet." description="Mark countries as visited from Explore or the detail page to record where you have been." />
      )}
    </div>
  );
}

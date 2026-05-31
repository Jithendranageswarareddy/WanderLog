export default function BucketListTabs({ activeTab, onChange, wishlistCount, visitedCount }) {
  const tabs = [
    { id: 'wishlist', label: `Wishlist (${wishlistCount})` },
    { id: 'visited', label: `Visited (${visitedCount})` },
  ];

  return (
    <div className="bucket-tabs" role="tablist" aria-label="Bucket list categories">
      {tabs.map((tab) => (
        <button key={tab.id} type="button" className={activeTab === tab.id ? 'bucket-tab active' : 'bucket-tab'} onClick={() => onChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

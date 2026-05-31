export default function Loader({ label = 'Loading...', fullPage = false }) {
  return (
    <div className={fullPage ? 'loader loader-fullpage' : 'loader'} role="status" aria-live="polite">
      <span className="loader-spinner" aria-hidden="true" />
      <span className="loader-label">{label}</span>
    </div>
  );
}

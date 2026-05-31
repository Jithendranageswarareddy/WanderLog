import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

export default function Navbar() {
  const { logout, user, theme, toggleTheme } = useAuth();
  const email = user?.email || '';
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=0f766e&color=ffffff&rounded=true&bold=true`;

  return (
    <header className="navbar">
      <Link className="brand" to="/explore" aria-label="WanderLog home">
        <span className="brand-mark">W</span>
        <span className="brand-name">WanderLog</span>
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/explore" className={navLinkClass}>
          Explore
        </NavLink>
        <NavLink to="/bucket-list" className={navLinkClass}>
          Bucket List
        </NavLink>
      </nav>

      <div className="navbar-actions">
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>

        <div className="avatar-wrap" title={email}>
          <img className="avatar" src={avatarUrl} alt={email} />
        </div>

        <button type="button" className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

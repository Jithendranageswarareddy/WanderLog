import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/explore" replace />;
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-brand">
          <span className="brand-mark large">W</span>
          <div>
            <h1>WanderLog</h1>
            <p>Your journey. Your bucket list.</p>
          </div>
        </div>
        <div className="auth-copy">
          <h2>Plan every country you want to see.</h2>
          <p>Search the world, track what you want to visit, and save the places you have already explored.</p>
        </div>
        <div className="auth-badges">
          <span>Protected routes</span>
          <span>Bucket list sync</span>
          <span>Dark mode</span>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p>Sign in to continue your adventures.</p>
        </div>
        <LoginForm />
        <p className="auth-footer-link">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </section>
    </main>
  );
}

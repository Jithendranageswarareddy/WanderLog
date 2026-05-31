import { Link, Navigate } from 'react-router-dom';
import SignupForm from '../components/Auth/SignupForm';
import { useAuth } from '../hooks/useAuth';

export default function SignupPage() {
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
          <h2>Build your travel life in one place.</h2>
          <p>Create an account to save countries, track visits, and keep your progress on every refresh.</p>
        </div>
        <div className="auth-badges">
          <span>Reqres auth</span>
          <span>Local persistence</span>
          <span>SPA routing</span>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-header">
          <h2>Create account</h2>
          <p>Register with your email and start exploring.</p>
        </div>
        <SignupForm />
        <p className="auth-footer-link">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

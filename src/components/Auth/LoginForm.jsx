import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Layout/Loader';
import { useAuth } from '../../hooks/useAuth';

const initialForm = {
  email: 'peter@klaven',
  password: 'cityslicka',
};

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authLoading } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [redirectTimer, setRedirectTimer] = useState(null);

  const from = location.state?.from?.pathname || '/explore';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setMessageType('');

    if (redirectTimer) {
      clearTimeout(redirectTimer);
    }

    try {
      const authData = await login(form);

      // If the auth API returned a local-demo fallback, show a clear warning to the user
      if (authData?.provider === 'local-demo') {
        setMessageType('warning');
        setMessage('Signed in using a demo fallback because the ReqRes auth endpoint is unavailable. Your session is simulated for demo purposes.');
      } else {
        setMessageType('success');
        setMessage('Welcome back. Redirecting you to WanderLog.');
      }

      const timerId = window.setTimeout(() => {
        navigate(from, { replace: true });
      }, 900);
      setRedirectTimer(timerId);
    } catch (error) {
      setMessageType('error');
      setMessage(error instanceof Error ? error.message : 'Unable to sign in.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className={`message-banner ${messageType}`}>{message || 'Sign in to continue your journey.'}</div>

      <label className="field-label" htmlFor="login-email">
        Email
      </label>
      <input
        id="login-email"
        className="text-input"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        autoComplete="email"
        required
      />

      <label className="field-label" htmlFor="login-password">
        Password
      </label>
      <input
        id="login-password"
        className="text-input"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter your password"
        autoComplete="current-password"
        required
      />

      <button className="primary-button auth-submit" type="submit" disabled={authLoading}>
        {authLoading ? <Loader label="Signing in..." /> : 'Sign In'}
      </button>

      <div className="auth-hint">
        The login form uses the real Reqres API and persists your session after refresh.
      </div>
    </form>
  );
}

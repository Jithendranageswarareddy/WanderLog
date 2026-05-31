import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { useAuth } from '../../hooks/useAuth';

const initialForm = {
  email: 'eve.holt@reqres.in',
  password: 'pistol',
};

export default function SignupForm() {
  const navigate = useNavigate();
  const { signup, authLoading } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [redirectTimer, setRedirectTimer] = useState(null);

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
      const authData = await signup(form);

      if (authData?.provider === 'local-demo') {
        setMessageType('warning');
        setMessage('Account created using a demo fallback because the ReqRes auth endpoint is unavailable. Your session is simulated for demo purposes.');
      } else {
        setMessageType('success');
        setMessage('Account created successfully. Taking you into WanderLog.');
      }

      const timerId = window.setTimeout(() => {
        navigate('/explore', { replace: true });
      }, 900);
      setRedirectTimer(timerId);
    } catch (error) {
      setMessageType('error');
      setMessage(error instanceof Error ? error.message : 'Unable to create account.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className={`message-banner ${messageType}`}>{message || 'Create your travel account in seconds.'}</div>

      <label className="field-label" htmlFor="signup-email">
        Email
      </label>
      <input
        id="signup-email"
        className="text-input"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        autoComplete="email"
        required
      />

      <label className="field-label" htmlFor="signup-password">
        Password
      </label>
      <input
        id="signup-password"
        className="text-input"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Create a password"
        autoComplete="new-password"
        required
      />

      <button className="primary-button auth-submit" type="submit" disabled={authLoading}>
        {authLoading ? <Loader label="Creating account..." /> : 'Create Account'}
      </button>
    </form>
  );
}

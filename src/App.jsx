import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ExplorePage from './pages/ExplorePage';
import CountryDetailPage from './pages/CountryDetailPage';
import BucketListPage from './pages/BucketListPage';

function ProtectedLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

function AppThemeSync() {
  const { theme } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
}

export default function App() {
  return (
    <>
      <AppThemeSync />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/country/:code" element={<CountryDetailPage />} />
            <Route path="/bucket-list" element={<BucketListPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

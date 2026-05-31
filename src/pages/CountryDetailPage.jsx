import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Layout/Loader';
import CountryInfo from '../components/CountryDetail/CountryInfo';
import ActionButtons from '../components/CountryDetail/ActionButtons';
import { fetchCountryByCode } from '../api/countriesApi';

export default function CountryDetailPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadCountry = async () => {
      setLoading(true);
      setError('');
      setCountry(null);

      try {
        const data = await fetchCountryByCode(code);
        if (!data?.code) {
          throw new Error('Country not found.');
        }

        if (isMounted) {
          setCountry(data);
        }
      } catch (apiError) {
        if (isMounted) {
          setError('This country could not be loaded. Check the country code or try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCountry();

    return () => {
      isMounted = false;
    };
  }, [code]);

  return (
    <div className="page-stack detail-page">
      <div className="page-topbar">
        <button type="button" className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <Link className="subtle-link" to="/explore">
          Back to Explore
        </Link>
      </div>

      {loading ? (
        <Loader fullPage label="Loading country details..." />
      ) : error ? (
        <div className="error-panel">
          <h3>Country unavailable</h3>
          <p>{error}</p>
          <Link className="primary-button link-button" to="/explore">
            Return to Explore
          </Link>
        </div>
      ) : (
        <>
          <CountryInfo country={country} />
          <ActionButtons country={country} />
        </>
      )}
    </div>
  );
}

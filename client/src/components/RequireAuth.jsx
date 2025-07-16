import { useEffect, useState } from 'react';
import axios from '../axios';
import { Navigate, useLocation } from 'react-router-dom';



// Auth wrapper
function RequireAuth({ children }) {
  const [checked, setChecked] = useState(false);
  const [valid, setValid] = useState(false);
  const token = sessionStorage.getItem('token');
  const expiry = sessionStorage.getItem('token_expiry');
  const location = useLocation();
  const isExpired = !expiry || Date.now() > Number(expiry);

  useEffect(() => {
    const verify = async () => {
      if (!token || isExpired) {
        setValid(false);
        setChecked(true);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('token_expiry');
        return;
      }
      try {
        const res = await axios.post('/verify-token', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setValid(res.data.valid);
      } catch {
        setValid(false);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('token_expiry');
      } finally {
        setChecked(true);
      }
    };
    verify();
    // eslint-disable-next-line
  }, [token, expiry]);

  if (!checked) return null; // or a loading spinner

  if (!valid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth
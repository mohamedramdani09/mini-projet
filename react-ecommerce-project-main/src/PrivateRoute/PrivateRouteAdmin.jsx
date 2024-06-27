import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouteAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    if (token) {
      
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? (
    children
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default PrivateRouteAdmin;

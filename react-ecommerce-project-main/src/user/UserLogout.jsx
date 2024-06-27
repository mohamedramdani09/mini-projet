// user/UserLogout.jsx
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axiosInstance.post('/logout');
        navigate('/');
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default UserLogout;

import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, loginAdmin as apiLoginAdmin} from '../api/authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      setAdmin({ token });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials, onSuccess) => {
    setLoading(true); 
    try {
      const userData = await apiLogin(credentials); 
      setUser(userData); 
      localStorage.setItem('ACCESS_TOKEN', userData.token);
      setLoading(false); 
      onSuccess();
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false); 
      throw error; 
    }
  };

  const handleRegister = async (userData, onSuccess) => {
    setLoading(true);
    try {
      const registeredUser = await apiRegister(userData);
      setUser(registeredUser);
      localStorage.setItem('ACCESS_TOKEN', registeredUser.token);
      setLoading(false); 
      onSuccess();
    } catch (error) {
      console.error("Registration error:", error);
      setLoading(false); 
      throw error; 
    }
  };

 
  const handleLogout = async (redirect) => {
    setLoading(true);
    try {
      await apiLogout();
      setUser(null); 
      localStorage.removeItem('ACCESS_TOKEN');
      redirect();
      setLoading(false);
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
      throw error; 
    }
  };

  const handleLoginAdmin = async (credentials, onSuccess) => {
    setLoading(true);
    try {
      const adminData = await apiLoginAdmin(credentials);
      setAdmin(adminData);
      localStorage.setItem('ADMIN_TOKEN', adminData.token);
      setLoading(false);
      onSuccess();
    } catch (error) {
      console.error("Admin login error:", error);
      setLoading(false);
      throw error;
    }
  };

  // const handleLogoutAdmin = async () => {
  //   setLoading(true);
  //   try {
  //     await apiLogoutAdmin();
  //     setUser(null);
  //     localStorage.removeItem('token');
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Admin logout error:", error);
  //     setLoading(false);
  //     throw error;
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, admin, loading, handleLogin, handleRegister, handleLogout, handleLoginAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

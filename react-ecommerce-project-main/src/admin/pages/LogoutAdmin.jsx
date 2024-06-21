// import React, { useContext, useEffect } from 'react';
// import { AuthContext } from '../../contexts/AuthProvider';
// import { useNavigate } from 'react-router-dom';

// const LogoutAdmin = () => {

//   const { handleLogoutAdmin } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const logout = async () => {
//       await handleLogoutAdmin();
//       navigate('/admin/login');
//     };

//     logout();
//   }, [handleLogoutAdmin, navigate]);

//   return null; // No need to render anything
// };

// export default LogoutAdmin;
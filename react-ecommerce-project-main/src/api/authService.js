import axiosInstance from './axiosConfig';

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data || error.message;
  }
};



export const register = async (userData) => {

  try {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/logout');
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error.response?.data || error.message;
  }
};

export const loginAdmin = async (credentials) => {
  try {
    const response = await axiosInstance.post('/admin/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Admin login error:", error);
    throw error.response?.data || error.message;
  }
};

// export const logoutAdmin = async () => {
//   try {
//     const response = await axiosInstance.post('/admin/logout', {}, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     localStorage.removeItem('token');
//     return response.data;
//   } catch (error) {
//     console.error("Admin logout error:", error);
//     throw error.response?.data || error.message;
//   }
// };
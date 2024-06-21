import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; 

// Start funxtion Statistique of Dashboard
export const fetchStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};
// End funxtion Statistique of Dashboard

// Start funxtion User of Dashboard
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
// End funxtion User of Dashboard

// Start funxtion Category of Dashboard
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId, updatedCategory) => {
  try {
    const response = await axios.put(
      `${API_URL}/categories/${categoryId}`,
      updatedCategory
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`${API_URL}/categories/${categoryId}`);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const createCategory = async (newCategory) => {
  try {
    const response = await axios.post(
      `${API_URL}/categories/create`,
      newCategory
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
// End funxtion Category of Dashboard

// Start funxtion products of Dashboard
export const getProduct = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteProduct = async (productsId) => {
  try {
    await axios.delete(`${API_URL}/products/${productsId}`);
  } catch (error) {
    console.error("Error deleting products:", error);
    throw error;
  }
};

// End funxtion products of Dashboard

// Start funxtion Order of Dashboard
export const getOrder = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`${API_URL}/orders/${orderId}`);
  } catch (error) {
    console.error("Error deleting orders:", error);
    throw error;
  }
};
// End funxtion Order of Dashboard

export const getpayment = async () => {
  try {
    const response = await axios.get(`${API_URL}/payment/index`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment:", error);
    throw error;
  }
};
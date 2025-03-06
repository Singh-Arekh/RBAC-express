// src/services/authService.js
import axios from 'axios';

// const API_URL = 'http://localhost:7000/api';

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/register`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/login`, { username, password });
      return response.data;  // return the response data which includes the token
    } catch (error) {
      // If there's an error, extract the message from the response
      console.log(error.response?.data?.message)
      throw new Error(error.response?.data?.message);
    }
  };
  

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/all-users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/update-role/${userId}`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/delete-user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

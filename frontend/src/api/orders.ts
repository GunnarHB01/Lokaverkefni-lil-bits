import axios from "axios";

const API_URL = "http://localhost:3001/api/orders";

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

export const getOrderByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/order/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order for email ${email}:`, error);
    throw error;
  }
};

export const createOrder = async (orderData: {
  email: string;
  dish: any;
  drinks?: any[];
  count?: number;
  date?: Date;
}) => {
  try {
    const response = await axios.post(`${API_URL}/create-order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateOrder = async (orderData: {
  email: string;
  dish: any;
  drinks?: any[];
  count?: number;
  date?: Date;
}) => {
  try {
    const response = await axios.put(`${API_URL}/update-order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export const deleteOrderById = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/order/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }
};

export const deleteOrderByEmail = async (email: string) => {
  try {
    const response = await axios.delete(`${API_URL}/order/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order with email ${email}:`, error);
    throw error;
  }
};
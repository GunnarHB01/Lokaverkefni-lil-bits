import axios from "axios";

const API_URL = "http://localhost:3001/api/orders";

export const getOrders = async () => await axios.get(API_URL);
export const createOrder = async (order: any) => await axios.post(API_URL, order);
export const updateOrder = async (id: string, order: any) => await axios.put(`${API_URL}/${id}`, order);
export const deleteOrder = async (id: string) => await axios.delete(`${API_URL}/${id}`);

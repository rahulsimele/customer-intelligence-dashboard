import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/";

export const fetchCustomerMetrics = async () => {
  const response = await axios.get(`${API_BASE}customer-metrics/`);
  return response.data;
};

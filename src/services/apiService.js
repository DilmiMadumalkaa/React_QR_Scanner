import axios from 'axios';
const api = axios.create({
baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
});
export const sendScanResult = async (payload) => {
// example POST - adapt to your backend's contract
const res = await api.post('/scan', payload);
return res.data;
};
export default api;

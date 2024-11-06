import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app.echomeets.online',
  withCredentials: true
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app.echomeets.online',
});

export default api;

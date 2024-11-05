import axios from 'axios';

const api = axios.create({
  baseURL: 'http://45.169.29.120:8000',
});

export default api;

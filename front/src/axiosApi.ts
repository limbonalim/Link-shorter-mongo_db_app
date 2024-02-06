import axios from 'axios';
import { ApiURL } from './constants.ts';

const axiosApi = axios.create({
  baseURL: ApiURL
});

export default axiosApi;
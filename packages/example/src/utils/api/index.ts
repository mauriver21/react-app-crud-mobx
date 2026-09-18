import { ENV } from '@/constants/env';
import axios from 'axios';

export const api = axios.create({ baseURL: ENV.API_BASE_URL });

import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const baseURL = 'https://campus-community.onrender.com'
export const api = axios.create({ baseURL, withCredentials: false })

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

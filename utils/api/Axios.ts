import { LocalStorageHelpers } from '@/eva-components/helpers/localstorage.helpers';
import axios from 'axios';
import { LocalStorageKeys } from '../common.utils';
import { CommonEnums } from '@/enums/common.enums';

// axios.defaults.withCredentials = true;

// http://44.216.25.102:5000/api
// http://44.216.25.102:5000/api

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3002/api',
  //baseURL: CommonEnums.url.apiBasePath,
  baseURL: 'https://api.evaevents.com/api',
});

axiosInstance.interceptors.request.use((config: any) => {
  const accessToken = LocalStorageHelpers.getAccessToken();

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken || ''}`;
  }
  return config;
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   config.params = config.params || {};
//   config.params["auth"] = token;
//   return config;
// });

export default axiosInstance;

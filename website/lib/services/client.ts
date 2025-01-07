import axios, {
  //AxiosError,
  AxiosRequestConfig,
  //AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
  //InternalAxiosRequestConfig,
} from "axios";
//import { StoreStateType } from '@lib/store.type';
//import { store } from '@lib/store';

type RequestFunc = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

// export const createAuthInterceptor = (): RequestFunc => {
//   const state = store.getState() as StoreStateType;
//   const token = state.login?.user?.login?.token;
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   } as AxiosRequestHeaders;
//   console.log('Auth interceptor headers', headers);

//   const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
//     return { ...config, headers };
//   };

//   return (config: AxiosRequestConfig): Promise<AxiosResponse> => {
//     return axios.request(onRequest(config)).catch((error: AxiosError) => {
//       // Handle error
//       return Promise.reject(error);
//     });
//   };
// };

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  timeout: 5 * 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   if (config?.headers) {
//     const state = store.getState() as StoreStateType;
//     const token = state.login?.user?.login?.token;
//     config.headers['Authorization'] = `Bearer ${token}` || '';
//   }
//   return config;
// });

const formDataClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  timeout: 5 * 60000,
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=--------------------------700715399828023233426788",
    "Apollo-Require-Preflight": "true",
  },
});

formDataClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  }
);

export { client, formDataClient };

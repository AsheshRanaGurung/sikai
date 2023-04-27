import axios, { AxiosRequestConfig } from "axios";
import TokenService from "./service-token";

type RequestData = Record<string, any>;

const defaultSikaaiResponse = {
  data: [],
  status: 0,
  message: "",
};
const THREE_MINUTES = 3 * 60 * 1000;

export const baseURL = import.meta.env.VITE_APP_BACKEND_API;

// const refreshTokenURL = "/api/v1/users/token/refresh/";

const baseConfig = (disableAuth?: boolean): AxiosRequestConfig<RequestData> => {
  const token = TokenService.getToken()?.access_token;
  // const refresh_token = TokenService.getToken()?.refresh_token;
  return {
    baseURL,
    timeout: THREE_MINUTES,
    headers: disableAuth
      ? {}
      : {
          Authorization: `Bearer ${token}`,
          // refresh_token,
        },
  };
};

/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */
const httpClient = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig<RequestData> & { disableAuth?: boolean }
  ) =>
    axios.get<T>(url, {
      ...baseConfig(config?.disableAuth),
      ...config,
    }),

  post: <T>(
    url: string,
    data: RequestData,
    config?: AxiosRequestConfig<RequestData> & { disableAuth?: boolean }
  ) =>
    axios.post<T>(url, data, {
      ...baseConfig(config?.disableAuth),
      data,
      ...config,
    }),

  put: <T>(
    url: string,
    data?: RequestData,
    config?: AxiosRequestConfig<RequestData>
  ) =>
    axios.put<T>(url, data, {
      ...baseConfig(),
      ...config,
    }),

  patch: <T>(
    url: string,
    data: RequestData,
    config?: AxiosRequestConfig<RequestData> & { disableAuth?: boolean }
  ) =>
    axios.patch<T>(url, data, {
      ...baseConfig(config?.disableAuth),
      ...config,
    }),

  delete: <T>(url: string, config?: AxiosRequestConfig<RequestData>) =>
    axios.delete<T>(url, {
      ...baseConfig(),
      ...config,
    }),
};

// axios.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error?.config?.url !== "/") {
//       if (error.response.status === httpStatus.UNAUTHORIZED) {
//         try {
//           const refreshToken = TokenService.getToken()?.refresh_token;
//           const response = await httpClient.get<{ data: { access: string } }>(
//             refreshTokenURL,
//             {
//               refresh: refreshToken,
//             }
//           );
//           const tokens = {
//             access_token: response.data.data.access,
//             refresh_token: refreshToken,
//           };
//           TokenService.setToken(tokens);
//         } catch (_error) {
//           TokenService.clearToken();
//           return Promise.reject(_error);
//         }
//       }
//     }
//     return Promise.reject(error.response);
//   }
// );

export { defaultSikaaiResponse, httpClient };

export const api = {
  user: {
    login: "/api/v1/users/login/",
  },
  service: {
    get: "/api/v1/service/",
  },
};

export interface SikaaiResponse<T = unknown> {
  data: T;
  status: 0 | 1;
  message: string;
}

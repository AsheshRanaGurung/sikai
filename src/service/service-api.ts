export const api = {
  user: {
    login: "/api/v1/users/login/",
  },
  service: {
    get: "/api/v1/service/",
  },
  question: {
    post: "/api/v1/assessment/question/",
  },
  course: {
    get: "/api/v1/service/course/",
    getById: "/api/v1/service/course/{id}/",
  },
  module: {
    get: "/api/v1/service/module/{id}/",
  },
};

export interface SikaaiResponse<T = unknown> {
  data: T;
  status: 0 | 1;
  message: string;
}

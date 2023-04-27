export const api = {
  user: {
    login: "/api/v1/users/login/",
  },
  service: {
    get: "/api/v1/service/",
  },
  courses: {
    get: "/api/v1/service/course/",
  },
  form: {
    get: "/api/v1/service/{service_id}/service-form/",
    getById: "/api/v1/service/service-form/{id}/",
  },
  subjects: {
    get: "/api/v1/service/subject/",
  },
  subjects_set: {
    get: "/api/v1/assessment/subject-set/",
  },
};

export interface SikaaiResponse<T = unknown> {
  data: T;
  status: 0 | 1;
  message: string;
}

export const api = {
  user: {
    login: "/api/v1/users/login/",
  },
  service: {
    get: "/api/v1/service/",
    getById: "/api/v1/service/{id}/",
    patch: "/api/v1/service/{id}/",
    course: {
      get: "/api/v1/service/{service_id}/course/",
    },
  },
  courses: {
    get: "/api/v1/service/{service_id}/course/",
    getById: "/api/v1/service/course/{id}/",
    patch: "/api/v1/service/course/{id}/",
  },
  form: {
    get: "/api/v1/service/{service_id}/service-form/",
    getById: "/api/v1/service/service-form/{id}/",
  },
  subjects: {
    get: "/api/v1/service/course/{course_id}/subject/",
  },
  subjects_set: {
    get: "/api/v1/assessment/subject/{subject_id}/subject-set/",
  },
  forum: {
    get: "/api/v1/forum/",
    getById: "/api/v1/forum/{id}",
  },
  about: {
    fetch: "/api/v1/info/about-us-content/",
    edit: "/api/v1/info/about-us-content/{id}/",
  },
  comment: {
    get: "/api/v1/forum/{forum_id}/comment/",
    post: "/api/v1/forum/{forum_id}/comment/",
    getById: "/api/v1/forum/{forum_id}/comment/{id}/",
    patch: "/api/v1/forum/{forum_id}/comment/{id}/",
    delete: "/api/v1/forum/{forum_id}/comment/{id}/",
  },
  advertisement: {
    get: "/api/v1/advertisement/advertise/",
    post: "/api/v1/advertisement/advertise/",
    getById: "/api/v1/advertisement/get/{id}/",
    patch: "/api/v1/advertisement/update/{id}/",
    delete: "/api/v1/advertisement/delete/{id}/",
  },
  question: {
    get: "/api/v1/assessment/question/",
    post: "/api/v1/assessment/question/",
  },
  faq: {
    get: "/api/v1/info/faq/",
    post: "/api/v1/info/faq/",
    delete: "/api/v1/info/faq/{id}/",
    patch: "/api/v1/info/faq/{id}/",
    getById: "/api/v1/info/faq/{id}/",
  },
};

// /api/v1/assessment/course/{course_id}/model-set/
export interface SikaaiResponse<T = unknown> {
  data: T;
  status: 0 | 1;
  message: string;
}

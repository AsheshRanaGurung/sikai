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
  // TODO: get and post has similar api name
  subjects_set: {
    get: "/api/v1/assessment/subject/{subject_id}/subject-set/",
    post: "/api/v1/assessment/subject/{subject_id}/subject-set/",
    getById: "/api/v1/assessment/subject/subject-set/{id}/",
    patch: "/api/v1/assessment/subject/subject-set/{id}/",
    delete: "/api/v1/assessment/subject/subject-set/{id}/",
  },
  forum: {
    get: "/api/v1/forum/",
    getById: "/api/v1/forum/{id}/",
  },
  about: {
    fetch: "/api/v1/info/about-us-content/",
    edit: "/api/v1/info/about-us-content/{id}/",
    saveVideo: "/api/v1/info/about-us-media/",
  },
  comment: {
    get: "/api/v1/forum/{forum_id}/comment/",
    post: "/api/v1/forum/{forum_id}/comment/",
    getById: "/api/v1/forum/{forum_id}/comment/{id}/",
    patch: "/api/v1/forum/{forum_id}/comment/{id}/",
    delete: "/api/v1/forum/{forum_id}/comment/{id}/",
  },
  advertisement: {
    get: "api/v1/advertisement/?type={type}",
    post: "/api/v1/advertisement/",
    getById: "/api/v1/advertisement/get/{id}/",
    patch: "/api/v1/advertisement/{id}/",
    delete: "/api/v1/advertisement/{id}/",
    adPlacement: {
      get: "api/v1/advertisement/ad-placement-pages/",
    },
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
  dashboard: {
    get: "api/v1/dashboard/recent-registered-students/",
    card: {
      get: "api/v1/dashboard/",
    },
  },
  map: {
    get: "api/v1/info/map-location/",
    post: "api/v1/info/map-location/",
  },
  contact: {
    get: "api/v1/info/contact-us/",
    patch: "api/v1/info/contact-us/{id}/",
    getById: "api/v1/info/contact-us/{id}/",
  },
};

export interface SikaaiResponse<T = unknown> {
  data: T;
  status: 0 | 1;
  message: string;
}

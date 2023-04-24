import { useQuery } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail } from "./service-toast";

export interface ICourseResponse {
  id: number;
  name: string;
  description: string;
  service: number;
}

const getCourse = () => {
  return httpClient.get<SikaaiResponse<ICourseResponse[]>>(api.course.get);
};

const useGetCourse = () => {
  return useQuery([api.course.get], getCourse, {
    select: ({ data }) => data.data,
    onError: () => {
      toastFail("Failed fetching Course");
    },
  });
};

const getCourseById = (id: string) => () => {
  return httpClient.get<SikaaiResponse<ICourseResponse>>(
    api.course.getById.replace("{id}", id)
  );
};

const useGetCourseById = (id: string) => {
  return useQuery([api.course.getById, id], getCourseById(id), {
    select: ({ data }) => data.data,
    onError: () => {
      toastFail("Failed fetching Course");
    },
  });
};

export { useGetCourse, useGetCourseById };

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
  return httpClient.get<SikaaiResponse<ICourseResponse[]>>(api.courses.get);
};

const useGetCourse = () => {
  return useQuery([api.courses.get], getCourse, {
    select: ({ data }) => data.data,
    onError: (error: any) => {
      toastFail(error.response?.data.message || "");
    },
  });
};

export { useGetCourse };

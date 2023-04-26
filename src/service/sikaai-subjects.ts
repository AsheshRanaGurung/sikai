import { useQuery } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail } from "./service-toast";

export interface ISubjectsResponse {
  id: number;
  name: string;
  description: string;
  course: number;
  is_active: boolean;
  created_at: string;
}

const getSubjects = () => {
  return httpClient.get<SikaaiResponse<ISubjectsResponse[]>>(api.subjects.get);
};

const useGetSubjects = () => {
  return useQuery([api.subjects.get], getSubjects, {
    select: ({ data }) => data.data,
    onError: (error: any) => {
      toastFail(error.response?.data.message || "");
    },
  });
};

export { useGetSubjects };

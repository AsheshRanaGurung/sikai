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

const getSubjects = (courseId: string) => () => {
  return httpClient.get<SikaaiResponse<ISubjectsResponse[]>>(
    api.subjects.get.replace("{course_id}", courseId)
  );
};

const useGetSubjects = ({ courseId }: { courseId: string }) => {
  return useQuery([api.subjects.get, courseId], getSubjects(courseId), {
    select: ({ data }) => data.data,
    enabled: !!courseId,
    onError: () => {
      toastFail("Failed to fetch subjects");
    },
  });
};

export { useGetSubjects };

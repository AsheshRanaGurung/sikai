import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface ICourseResponse {
  id: number;
  name: string;
  description: string;
  service: number;
}

export interface ICourseResById {
  name: string;
  description: string;
  course_info: ICourseInfo;
}

type ICourseInfoById = Omit<ICourseInfo, "time_limit_in_seconds">;

export interface ICourseReqById {
  // TODO: type vs interface
  // export interface ICourseReqById extends ICourseResById {
  //   id: string;
  // }
  name: string;
  description: string;
  course_info: ICourseInfoById;
  id: string;
}

export interface ICourseInfo {
  deduction_mark: string;
  time_limit: string;
  total_questions: number;
  time_limit_in_seconds: string;
}

const getCourse = (id: string) => () => {
  return httpClient.get<SikaaiResponse<ICourseResponse[]>>(
    api.courses.get.replace("{service_id}", id)
  );
};

const useGetCourse = (id: string) => {
  return useQuery([api.courses.get, id], getCourse(id), {
    select: ({ data }) => data.data,
    onError: (error: any) => {
      toastFail(error.response?.data.message || "");
    },
  });
};

const getCourseById = (id: string) => () => {
  return httpClient.get<SikaaiResponse<ICourseResById[]>>(
    api.courses.getById.replace("{id}", id)
  );
};

const useGetCourseById = (id: string) => {
  return useQuery([api.courses.getById, id], getCourseById(id), {
    select: ({ data }) => data.data[0],
    enabled: !!id,
    onError: () => {
      toastFail("Couldn't fetch course");
    },
  });
};

const updateCourse = (CourseDetails: ICourseReqById) => {
  return httpClient.patch(
    api.courses.patch.replace("{id}", CourseDetails.id),
    CourseDetails
  );
};

const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.courses.get);
      queryClient.invalidateQueries(api.courses.getById);
      toastSuccess("Course updated successfuly!");
    },
    onError: () => {
      toastFail("Couldn't update the course!  ");
    },
  });
};

export { useGetCourse, useGetCourseById, useUpdateCourse };

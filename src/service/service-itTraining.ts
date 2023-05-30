import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface ICourseSubjectsRes {
  id: number;
  name: string;
  code?: string;
  description: string;
  service?: number;
  course_link: string;
  is_active: boolean;
  created_at?: string;
}

export interface ICourseSubjectsReq
  extends Omit<ICourseSubjectsRes, "code" | "service" | "created_at" | "id"> {
  id: string;
}

const getCourseSubjects = () => {
  return httpClient.get<SikaaiResponse<ICourseSubjectsRes[]>>(
    api.subjects.itTraining.get
  );
};

const useGetCourseSubjects = () => {
  return useQuery([api.subjects.itTraining.get], getCourseSubjects, {
    select: ({ data }) => data.data,
    onError: () => {
      toastFail("Couldnot fetch data");
    },
  });
};

const updateCourseSubjects = (subjectDetails: ICourseSubjectsReq) => {
  return httpClient.patch<SikaaiResponse<ICourseSubjectsReq>>(
    api.subjects.itTraining.patch.replace("{id}", subjectDetails.id.toString()),
    subjectDetails
  );
};

const useUpdateCourseSubjects = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCourseSubjects, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects.itTraining.get);
      toastSuccess("Subjects updated successfully");
    },
    onError: () => {
      toastFail("Couldnot update the subjects");
    },
  });
};

const createSubjects = (subjectDetails: ICourseSubjectsReq) => {
  return httpClient.post(api.subjects.itTraining.post, subjectDetails);
};

const useCreateSubjects = () => {
  const queryClient = useQueryClient();
  return useMutation(createSubjects, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects.itTraining.get);
      toastSuccess("Subjects created sucessfully");
    },
    onError: (e: any) => {
      toastFail(e.response.data.error[0].name || "Subject creation failed");
    },
  });
};

const deleteSubjects = (id: string) => {
  return httpClient.delete(api.subjects.itTraining.delete.replace("{id}", id));
};

const useDeleteSubjects = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSubjects, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects.itTraining.get);
      toastSuccess("Subject deleted sucessfully");
    },
    onError: (e: any) => {
      toastFail(e.response.data.error[0].name || "Subject deletion failed");
    },
  });
};

export {
  useGetCourseSubjects,
  useUpdateCourseSubjects,
  useCreateSubjects,
  useDeleteSubjects,
};

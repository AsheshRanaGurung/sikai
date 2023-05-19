import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface ISubjectSets {
  id: number;
  name: string;
  subjects: Subject[];
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  course: number;
  subject_question_sets: SubjectQuestionSet[];
}

export interface SubjectQuestionSet {
  id: number;
  subject: number;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface IModalSetReq {
  name: string;
  subject_question_sets: number[];
  // code: string;
  is_archived?: boolean;
  is_active?: boolean;
  courseId: string;
}

export interface IModalSetUpdateReq extends IModalSetReq {
  id: string;
}

export interface IModalSetRes {
  id: number;
  name: string;
  course: number;
  code: string;
  is_archived: boolean;
  is_active: boolean;
  created_at: string;
}

export interface IModalSetUpdateRes extends IModalSetRes {
  subject_question_sets: SubjectQuestionSet[];
}

export interface SubjectQuestionSet {
  id: number;
  subject: number;
  name: string;
  is_active: boolean;
  created_at: string;
}

const getSubjectSets = (courseId: string) => {
  return httpClient.get<SikaaiResponse<ISubjectSets[]>>(
    api.model_set.subject_set.get.replace("{course_id}", courseId)
  );
};

const useGetSubjectSets = ({ courseId }: { courseId: string }) => {
  return useQuery(
    [api.model_set.subject_set.get, courseId],
    () => getSubjectSets(courseId),
    {
      enabled: !!courseId,
      select: ({ data }) => data?.data?.[0],
    }
  );
};

const createModalSets = (modalSetDetails: IModalSetReq) => {
  return httpClient.post(
    api.model_set.post.replace("{course_id}", modalSetDetails.courseId),
    modalSetDetails
  );
};

const useCreateModalSets = () => {
  const queryClient = useQueryClient();
  return useMutation(createModalSets, {
    onSuccess: () => {
      toastSuccess("Modal Sets created successfuly");
      queryClient.invalidateQueries(api.model_set.get);
    },
    onError: () => {
      toastFail("Failed to create Modal Sets");
    },
  });
};

const getModalSets = (course_id: string) => {
  return httpClient.get<SikaaiResponse<IModalSetRes[]>>(
    api.model_set.get.replace("{course_id}", course_id)
  );
};

const useGetModalSets = ({ course_id }: { course_id: string }) => {
  return useQuery(
    [api.model_set.get, course_id],
    () => getModalSets(course_id),
    {
      enabled: !!course_id,
      select: ({ data }) => data?.data,
    }
  );
};

const getModalSetsById = (id: string) => {
  return httpClient.get<SikaaiResponse<IModalSetUpdateRes[]>>(
    api.model_set.getById.replace("{id}", id)
  );
};

const useGetModalSetsById = (id: string) => {
  return useQuery([api.model_set.getById, id], () => getModalSetsById(id), {
    enabled: !!id,
    select: ({ data }) => data?.data?.[0],
  });
};

const updateModalSets = (modalSetDetails: IModalSetUpdateReq) => {
  return httpClient.patch(
    api.model_set.patch.replace("{id}", modalSetDetails.id),
    modalSetDetails
  );
};

const useUpdateModalSets = () => {
  const queryClient = useQueryClient();
  return useMutation(updateModalSets, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.model_set.get);
      queryClient.invalidateQueries(api.model_set.getById);
      toastSuccess("Modal Set updated successfuly");
    },
    onError: () => {
      toastFail("Failed to update modal set");
    },
  });
};

const deleteModalSets = (id: string) => {
  return httpClient.delete(api.model_set.delete.replace("{id}", id));
};

const useDeleteModalSets = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteModalSets, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.model_set.get);
      toastFail("Deleted modal successfuly");
    },
    onError: () => {
      toastFail("Couldnot delete modal");
    },
  });
};

export {
  useGetSubjectSets,
  useCreateModalSets,
  useGetModalSets,
  useDeleteModalSets,
  useUpdateModalSets,
  useGetModalSetsById,
};

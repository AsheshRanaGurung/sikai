import { toFormData } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";
// import { toFormData } from "@sikaai/utils/form-data";

export interface IQuestion {
  parent_id?: number;
  parent_content?: string;
  question_text: string;
  question_image?: string;
  subject_question_set_id: number;
  options: IOption[];
  solution: ISolution;
}

interface IOption {
  answer_text?: string;
  answer_image?: File | null;
  is_correct: boolean;
}

interface ISolution {
  description?: string;
  image?: string;
}

export interface IQuestionSetReq {
  subject_id: string;
  name: string;
}

export interface IQuestionSetRes extends IQuestionSetReq {
  id: number;
}

export interface IQuestionSetUpdateReq {
  id: string;
  name: string;
  is_active?: boolean;
}

const getQuestionSet = (subjectId: string) => () => {
  return httpClient.get<SikaaiResponse<IQuestionSetRes[]>>(
    api.subjects_set.get.replace("{subject_id}", subjectId)
  );
};

const useGetQuestionSet = ({ subjectId }: { subjectId: string }) => {
  return useQuery(
    [api.subjects_set.get, subjectId],
    getQuestionSet(subjectId),
    {
      select: ({ data }) => data.data,
      onError: () => {
        toastFail("Failed to fetch Question set");
      },
    }
  );
};

const createQuestionSet = (questionSetDetails: IQuestionSetReq) => {
  return httpClient.post(
    api.subjects_set.post.replace(
      "{subject_id}",
      questionSetDetails.subject_id
    ),
    questionSetDetails
  );
};

const useCreateQuestionSet = () => {
  const queryClient = useQueryClient();
  return useMutation(createQuestionSet, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects_set.get);
    },
    onError: () => {
      toastFail("Question set creation failed");
    },
  });
};

const getQuestion = () => {
  return httpClient.get<SikaaiResponse<any>>(api.question.get);
};

const useGetQuestion = () => {
  return useQuery(api.question.get, getQuestion, {
    select: ({ data }) => data.data,
    onError: () => {
      toastFail("Failed to fetch Question");
    },
  });
};

const createQuestion = (questionDetails: IQuestion) => {
  return httpClient.post(api.question.post, toFormData(questionDetails));
};

const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation(createQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects_set.get);
    },
    onError: () => {
      toastFail("Question creation failed");
    },
  });
};

const getQuestionSetById = ({ id }: { id: string }) => {
  return httpClient.get<SikaaiResponse<IQuestionSetRes[]>>(
    api.subjects_set.getById.replace("{id}", id)
  );
};

const useGetQuestionSetById = ({ id }: { id: string }) => {
  return useQuery(
    [api.subjects_set.getById, id],
    () => getQuestionSetById({ id }),
    {
      enabled: !!id,
      select: ({ data }) => data?.data[0],
      onError: () => {
        toastFail("Couldnot fetch question set");
      },
    }
  );
};

const updateQuestionSet = (questionSetDetails: IQuestionSetUpdateReq) => {
  return httpClient.patch(
    api.subjects_set.patch.replace("{id}", questionSetDetails.id),
    questionSetDetails
  );
};

const useUpdateQuestionSet = () => {
  const queryClient = useQueryClient();
  return useMutation(updateQuestionSet, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects_set.get);
      queryClient.invalidateQueries(api.subjects_set.getById);
      toastSuccess("Question set updated successfuly");
    },
    onError: () => {
      toastFail("Couldnot update Question set");
    },
  });
};

const deleteQuestionSet = ({ id }: { id: string }) => {
  return httpClient.delete(api.subjects_set.delete.replace("{id}", id));
};

const useDeleteQuestionSet = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteQuestionSet, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects_set.get);
      toastSuccess("Question set deleted successfuly");
    },
    onError: () => {
      toastFail("Couldnot delete Question Set");
    },
  });
};

export {
  useGetQuestionSet,
  useCreateQuestionSet,
  useCreateQuestion,
  useGetQuestion,
  useGetQuestionSetById,
  useUpdateQuestionSet,
  useDeleteQuestionSet,
};

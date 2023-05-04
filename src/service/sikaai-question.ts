import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail } from "./service-toast";

export interface IQuestionSetReq {
  subject_id: string;
  name: string;
}

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
  answer_image?: string;
  is_correct: boolean;
}

interface ISolution {
  description?: string;
  image?: string;
}

export interface IQuestionSetRes extends IQuestionSetReq {
  id: number;
}

const getQuestionSet = (id: string) => () => {
  return httpClient.get<SikaaiResponse<IQuestionSetRes[]>>(
    api.subjects_set.get.replace("{subject_id}", id)
  );
};
const useGetQuestionSet = (id: string) => {
  return useQuery([api.subjects_set.get, id], getQuestionSet(id), {
    select: ({ data }) => data.data,
    onError: (e: any) => {
      toastFail(e.response?.data.message || "");
    },
  });
};

const createQuestionSet = (questionSetDetails: IQuestionSetReq) => {
  return httpClient.post(
    api.subjects_set.get.replace("{subject_id}", questionSetDetails.subject_id),
    questionSetDetails
  );
};

const useCreateQuestionSet = () => {
  const queryClient = useQueryClient();
  return useMutation(createQuestionSet, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects_set.get);
    },
    onError: (e: any) => {
      toastFail(
        e.response.data.errors[0].name || "Question set creation failed"
      );
    },
  });
};

const getQuestion = () => {
  return httpClient.get<SikaaiResponse<any>>(api.question.get);
};

const useGetQuestion = () => {
  return useQuery(api.question.get, getQuestion, {
    select: ({ data }) => data.data,
    onError: (e: any) => {
      toastFail(e.response?.data.message || "");
    },
  });
};

const createQuestion = (questionDetails: IQuestion) => {
  return httpClient.post(api.question.post, questionDetails);
};

const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation(createQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects_set.get);
    },
    onError: (e: any) => {
      toastFail(e.response.data.errors[0].name || "Question creation failed");
    },
  });
};

export {
  useGetQuestionSet,
  useCreateQuestionSet,
  useCreateQuestion,
  useGetQuestion,
};

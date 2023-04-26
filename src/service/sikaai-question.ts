import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail } from "./service-toast";

export interface IQuestionSetReq {
  subject_id: number;
  name: string;
}

export interface IQuestionSetRes extends IQuestionSetReq {
  id: number;
}

const getQuestionSet = () => {
  return httpClient.get<SikaaiResponse<IQuestionSetRes[]>>(
    api.subjects_set.get
  );
};
const useGetQuestionSet = () => {
  return useQuery([api.subjects_set.get], getQuestionSet, {
    select: ({ data }) => data.data,
    onError: (e: any) => {
      toastFail(e.response?.data.message || "");
    },
  });
};

const createQuestionSet = (questionSetDetails: IQuestionSetReq) => {
  return httpClient.post<SikaaiResponse<IQuestionSetRes>>(
    api.subjects_set.get,
    questionSetDetails
  );
};

const useCreateQuestionSet = () => {
  const queryClient = useQueryClient();
  return useMutation(createQuestionSet, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects_set.get);
    },
  });
};

export { useGetQuestionSet, useCreateQuestionSet };

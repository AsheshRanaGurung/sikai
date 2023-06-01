import {
  ErrorResponseData,
  responseErrorHandler,
} from "@sikaai/utils/error-handle";
import { AxiosError, toFormData } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface IQuestion {
  ///////////////
  // TODO: parent id? and parent content
  parent_id?: number;
  parent_content?: string | null;
  question_text: string;
  question_image_base64?: string | unknown;
  subject_question_set_id: number;
  options: IOption[];
  solution: ISolution;
}

export interface IOption {
  answer_text?: string | null;
  answer_image_base64?: string | unknown;
  is_correct: boolean;
}

interface ISolution {
  description?: string | null;
  solution_image_base64?: string | unknown;
}

// Questionset
export interface IQuestionSetReq {
  subject_id: string;
  name: string;
}

export interface IQuestionSetRes extends IQuestionSetReq {
  id: number;
  question: IQuestionRes[];
}
//  Questionset end

export interface IQuestionSetUpdateReq {
  id: string;
  name: string;
  is_active?: boolean;
}

export interface IBulkUpload {
  subject_set_id: string;
  csv_file: File | null;
}

export interface IExcelTemplate {
  id: number;
  csv_file: string;
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

export interface IQuestionDetailsReq {
  ///////////////
  id: number;
  parent_id?: number;
  parent_content?: string | null;

  question_text: string;
  // question_image: string
  question_image_base64?: string | unknown;
  // subject: number
  options: IOptionReq[];
  solution: ISolution;
}

export interface IOptionReq {
  answer_text: string | null;
  // test this for unkknown//////////////
  answer_image_base64?: string | unknown;
  is_correct: boolean;
}

export interface ISolutionReq {
  description: string;
  solution_image_base64?: string;
}

// update question

const updateQuestionSetDetails = (questionSetDetails: IQuestionDetailsReq) => {
  const requestPayload = {
    ...questionSetDetails,
    parent_content: questionSetDetails?.parent_content,
    question_text: questionSetDetails?.question_text ?? null,
    question_image_base64:
      typeof questionSetDetails?.question_image_base64 == "string"
        ? questionSetDetails?.question_image_base64.replace(
            "data:image/png;base64,",
            ""
          )
        : null,
    options: questionSetDetails.options?.map(item => {
      return {
        ...item,
        answer_image_base64:
          typeof item?.answer_image_base64 == "string"
            ? item?.answer_image_base64.replace("data:image/png;base64,", "")
            : null,
        answer_text: item?.answer_text ?? null,
      };
    }),
    solution: {
      description: questionSetDetails?.solution?.description ?? null,
      solution_image_base64:
        typeof questionSetDetails?.solution?.solution_image_base64 == "string"
          ? questionSetDetails?.solution?.solution_image_base64.replace(
              "data:image/png;base64,",
              ""
            )
          : null,
    },
  };
  return httpClient.patch(
    api.question.patch.replace("{id}", questionSetDetails.id.toString()),
    requestPayload
  );
};

const useUpdateQuestionSetDetails = () => {
  const queryClient = useQueryClient();
  return useMutation(updateQuestionSetDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects_set.getById);
    },
  });
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
  return httpClient.get<SikaaiResponse<IQuestionRes[]>>(api.question.get);
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
  const requestPayload = {
    ...questionDetails,
    question_text: questionDetails?.question_text ?? null,
    question_image_base64:
      typeof questionDetails?.question_image_base64 == "string"
        ? questionDetails?.question_image_base64.replace(
            "data:image/png;base64,",
            ""
          )
        : null,
    options: questionDetails.options?.map(item => {
      return {
        ...item,
        answer_image_base64:
          typeof item?.answer_image_base64 == "string"
            ? item?.answer_image_base64.replace("data:image/png;base64,", "")
            : null,
        answer_text: item?.answer_text ?? null,
      };
    }),
    solution: {
      description: questionDetails?.solution?.description ?? null,
      solution_image_base64:
        typeof questionDetails?.solution?.solution_image_base64 == "string"
          ? questionDetails?.solution?.solution_image_base64.replace(
              "data:image/png;base64,",
              ""
            )
          : null,
    },
  };
  return httpClient.post<SikaaiResponse<IQuestionRes[]>>(
    api.question.post,
    requestPayload
  );
};

const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation(createQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.subjects_set.getById);
    },
    onError: (e: ErrorResponseData) => {
      responseErrorHandler(e);
    },
  });
};

export interface IQuestionRes {
  id: number;
  parent: IParent;
  parent_id: number;
  parent_content: string;
  question_text: string;
  ///////////////////
  // TODO
  //  you have image make different default value for that image
  // make that default value optional
  // but you cannot make it ooptional
  // when you get the response set that value on useeffect default values
  // question_image: string;
  question_image: any;
  subject: number;
  options: IOptionRes[];
  solution: ISolutionRes;
}

export interface IParent {
  id: number;
  // TODO: handle parent content
  parent_content: string;
}
export interface IOptionRes extends IOption {
  id: number;
  // answer_image: string;
  answer_image: any;
}

export interface ISolutionRes extends ISolution {
  id: number;
  // image: string;
  image: any;
}

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

const bulkUpload = (bulkUploadDetails: IBulkUpload) => {
  return httpClient.post(
    api.question.bulk.post.replace(
      "{subject_set_id}",
      bulkUploadDetails.subject_set_id
    ),
    toFormData({ csv_file: bulkUploadDetails.csv_file })
  );
};

const useBulkUpload = () => {
  return useMutation(bulkUpload, {
    onSuccess: () => {
      toastSuccess("Questions uploaded successfuly");
    },
    onError: () => {
      toastFail("Couldnot upload questions");
    },
  });
};

const downloadExcelTemplate = () => {
  return httpClient.get<SikaaiResponse<IExcelTemplate[]>>(
    api.question.bulk.get
  );
};

const useDownloadExcelTemplate = () => {
  return useMutation(downloadExcelTemplate, {
    onError: (error: AxiosError<{ error?: string; message: string }>) => {
      toastFail(
        error.response?.data.message || "Couldnot download excel template"
      );
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
  useBulkUpload,
  useDownloadExcelTemplate,
  useUpdateQuestionSetDetails,
};

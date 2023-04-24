// {
//     "parent_id": 0,
//     "parent_content": "string",
//     "question_text": "string",
//     "question_image": "string",
//     "module_question_set_id": 0,
//     "options": [
//       {
//         "answer_text": "string",
//         "answer_image": "string",
//         "is_correct": true
//       }
//     ],
//     "solution": {
//       "description": "string",
//       "image": "string"
//     }
//   }

import { useMutation } from "react-query";
import { api } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

const createQuestion = (questionDetails: any) => {
  return httpClient.post(api.question.post, questionDetails);
};
const useCreateQuestion = () => {
  return useMutation(createQuestion, {
    onSuccess: () => {
      toastSuccess("Question created successfuly");
    },
    onError: () => {
      toastFail("Question creation failed");
    },
  });
};

export { useCreateQuestion };

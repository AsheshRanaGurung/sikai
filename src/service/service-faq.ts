import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";
export interface IFaq {
  id: number;
  question: string;
  answer: string;
  is_active?: boolean;
}

const createFaq = (faqs: IFaq) => {
  return httpClient.post(api.faq.post, faqs);
};

const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation(createFaq, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.faq.get);
    },
    onError: (e: any) => {
      toastFail(e?.response?.data?.error[0]?.name || "Faq creation failed");
    },
  });
};

const getFaq = () => {
  return httpClient.get<SikaaiResponse<IFaq[]>>(api.faq.get);
};

const useGetFaq = () => {
  return useQuery(api.faq.get, getFaq, {
    select: ({ data }) => data.data,
    onError: (e: any) => {
      toastFail(e.response?.data.message || "Couldn't fetch FAQ");
    },
  });
};

const delFaq = (id: string) => {
  return httpClient.delete<SikaaiResponse<IFaq[]>>(
    api.faq.delete.replace("{id}", id)
  );
};

const useDelFaq = () => {
  const queryClient = useQueryClient();
  return useMutation(delFaq, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.faq.get);
    },
    onError: (e: any) => {
      toastFail(e.response?.data.message || "Couldn't delete FAQ");
    },
  });
};

const getFaqById = (id: string) => () => {
  return httpClient.get<SikaaiResponse<IFaq[]>>(
    api.faq.getById.replace("{id}", id)
  );
};

const useGetFaqById = (id: string) => {
  return useQuery([api.faq.getById, id], getFaqById(id), {
    select: ({ data }) => data.data[0],
    enabled: !!id,
    onError: () => {
      toastFail("Couldn't fetch faq");
    },
  });
};

const updateFaq = (FaqDetails: IFaq) => {
  return httpClient.patch(
    api.faq.patch.replace("{id}", FaqDetails.id.toString()),
    FaqDetails
  );
};

const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation(updateFaq, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.faq.get);
      toastSuccess("Faq updated successfully");
    },
    onError: () => {
      toastFail("Couldn't update the faq!");
    },
  });
};

export { useGetFaq, useCreateFaq, useDelFaq, useUpdateFaq, useGetFaqById };

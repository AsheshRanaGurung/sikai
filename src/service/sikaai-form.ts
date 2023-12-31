import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface IFormResponse {
  id: number;
  service: number;
  user: number;
  phone_number: string;
  content: string;
  created_at: string;
  full_name: string;
  email: string;
  address: string;
  college: string;
}

const getForm =
  ({ id }: { id: string }) =>
  () => {
    return httpClient.get<SikaaiResponse<IFormResponse[]>>(
      api.form.get.replace("{service_id}", id)
    );
  };

const useGetForm = ({ id }: { id: string }) => {
  return useQuery([api.form.get, id], getForm({ id }), {
    enabled: !!id,
    select: ({ data }) => data.data,
    onError: (e: any) => {
      toastFail(e.response.data.errors[0].name || "Failed to  access data");
    },
  });
};

const getFormById =
  ({ id }: { id: string }) =>
  () => {
    return httpClient.get<SikaaiResponse<IFormResponse[]>>(
      api.form.getById.replace("{id}", id)
    );
  };

const useGetFormById = ({ id }: { id: string }) => {
  return useQuery([api.form.get, id], getFormById({ id }), {
    enabled: !!id,
    select: ({ data }) => data?.data?.[0],
    onError: (e: any) => {
      toastFail(e.response.data.errors[0].name || "Failed to  access data");
    },
  });
};

const deleteForm = (id: string) => {
  return httpClient.delete(api.form.delete.replace("{id}", id));
};

const useDeleteForm = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteForm, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.form.get);
      toastSuccess("Form deleted Successfully");
    },
    onError: (e: any) => {
      toastFail(e.response?.data.message || "Couldn't delete form");
    },
  });
};

export { useGetForm, useGetFormById, useDeleteForm };

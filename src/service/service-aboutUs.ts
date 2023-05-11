import { useMutation, useQuery, useQueryClient } from "react-query";
import { SikaaiResponse, api } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail } from "./service-toast";

export interface IAboutUs {
  id: number | string;
  heading: string;
  sub_heading?: string;
  description: string;
  created_at: string;
}

export type IEditAboutUs = Omit<IAboutUs, "created_at">;

const fetchAboutUs = () => {
  return httpClient.get<SikaaiResponse<IAboutUs[]>>(api.about.fetch);
};

const useFetchAboutUs = () => {
  return useQuery([api.about.fetch], fetchAboutUs, {
    select: data => data?.data?.data,
  });
};

const editAboutUs = (editData: IEditAboutUs) => {
  return httpClient.patch(
    api.about.edit.replace("{id}", editData.id?.toString()),
    {
      heading: editData.heading,
      sub_heading: editData.sub_heading,
      description: editData.description,
    }
  );
};

const useEditAboutUs = () => {
  const clientQuery = useQueryClient();
  return useMutation(editAboutUs, {
    onError: (error: any) => {
      toastFail(error?.data?.message ?? "");
    },
    onSuccess: () => {
      clientQuery.invalidateQueries(api.about.fetch);
    },
  });
};

export { useFetchAboutUs, useEditAboutUs };

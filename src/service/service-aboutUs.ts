import { useMutation, useQuery, useQueryClient } from "react-query";
import { SikaaiResponse, api } from "./service-api";
import { httpClient } from "./service-axois";
import { toFormData } from "@sikaai/utils/form-data";
import { toastFail, toastSuccess } from "./service-toast";

export interface IAboutUs {
  id: number | string;
  heading: string;
  sub_heading?: string;
  description: string;
  created_at: string;
}

export interface IAboutUsMedia extends IAboutUs {
  video: string;
}

export type IEditAboutUs = Omit<IAboutUs, "created_at">;

export type IEditAboutUsMedia = Omit<
  IAboutUsMedia,
  "created_at" | "sub_heading" | "video" | "id"
> & {
  video: Blob;
};
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
      toastSuccess("Updated successfuly");
      clientQuery.invalidateQueries(api.about.fetch);
    },
  });
};

const saveMedia = (video: IAboutUsMedia) => {
  return httpClient.post(api.about.saveVideo, toFormData(video));
};

const useSaveVideo = () => {
  const clientQuery = useQueryClient();
  return useMutation(saveMedia, {
    onSuccess: () => {
      toastSuccess("video saved");
      clientQuery.invalidateQueries(api.about.fetch);
    },
  });
};

const getVideoData = () => {
  return httpClient.get<SikaaiResponse<IAboutUsMedia[]>>(api.about.get);
};

const useGetVideoData = () => {
  return useQuery([api.about.get], getVideoData, {
    select: ({ data }) => data.data,
  });
};

const updateVideoData = (editVideoData: IEditAboutUsMedia) => {
  return httpClient.patch(api.about.patch, toFormData(editVideoData));
};

const useUpdateVideoData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateVideoData, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.about.get);
      toastSuccess("Update successfully");
    },
    onError: () => {
      toastFail("couldn't update");
    },
  });
};

export {
  useFetchAboutUs,
  useEditAboutUs,
  useSaveVideo,
  useGetVideoData,
  useUpdateVideoData,
};

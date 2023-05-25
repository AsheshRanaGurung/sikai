import { useQuery } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail } from "./service-toast";

export interface IForumResponse {
  id: number;
  created_by: number;
  full_name: string;
  total_comments: string;
  created_at: Date;
  title: string;
  tags: number[];
  question_text: string;
  question_image: string;
  is_deleted: boolean;
  is_locked: boolean;
  profile_picture: any;
  is_admin_comment: boolean;
}

const getForum = () => {
  return httpClient.get<SikaaiResponse<IForumResponse[]>>(api.forum.get);
};

const useGetForum = () => {
  return useQuery([api.forum.get], getForum, {
    select: ({ data }) => data.data,
    onError: (error: any) => {
      toastFail(error.response?.data.message || "");
    },
  });
};

const getForumById = ({ id }: { id: string }) => {
  return httpClient.get<SikaaiResponse<IForumResponse[]>>(
    api.forum.getById.replace("{id}", id)
  );
};

const useGetForumById = ({ id }: { id: string }) => {
  return useQuery([api.forum.getById, id], () => getForumById({ id }), {
    enabled: !!id,
    select: ({ data }) => data.data[0],
    onError: (e: any) => {
      toastFail(e.response.data.error[0].name || "failed to Access data");
    },
  });
};

export { useGetForum, useGetForumById };

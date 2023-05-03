import { useQuery } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail } from "./service-toast";

export interface IForumResponse {
  id: number;
  created_by: number;
  created_at: Date;
  title: string;
  tags: number[];
  question_text: string;
  question_image: string;
  is_deleted: boolean;
  is_locked: boolean;
}
export interface IForumComment {
  id: number;
  text_content: string;
  image_content: any;
  created_by: string;
  created_at: Date;
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
    select: ({ data }) => data.data,
    onError: (e: any) => {
      toastFail(e.response.data.error[0].name || "failed to Access data");
    },
  });
};

const getComment = ({ id }: { id: string }) => {
  return httpClient.get<SikaaiResponse<IForumComment[]>>(
    api.comment.get.replace("{forum_id}", id)
  );
};

const useGetComment = ({ id }: { id: string }) => {
  return useQuery([api.comment.get, id], () => getComment({ id }), {
    enabled: !!id,
    select: ({ data }) => data.data,
    onError: (e: any) => {
      toastFail(e.response.data.error[0].name || "failed to access data");
    },
  });
};

export { useGetForum, useGetForumById, useGetComment };
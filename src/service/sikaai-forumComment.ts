import { useQuery, useQueryClient, useMutation } from "react-query";
import { SikaaiResponse, api } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface IForumComment {
  id: string;
  text_content: string;
  image_content: any;
  created_by: string;
  created_at: Date;
  is_admin: boolean;
  is_pinned_comment: boolean;
  full_name: string;
  profile_picture: any;
}

// To create comment
export interface IForumCommentReq {
  id: string;
  text_content: string;
  // image_content: string
  is_pinned_comment: boolean;
  // created_by: number
}

export interface IForumCommentUpdateReq extends IForumCommentReq {
  id: string;
  forum_id: string;
  text_content: string;
}

export interface IForumCommentDelParams {
  forum_id: string;
  id: string;
}

const getComment = ({ forum_id }: { forum_id: string }) => {
  return httpClient.get<SikaaiResponse<IForumComment[]>>(
    api.comment.get.replace("{forum_id}", forum_id)
  );
};

const useGetComment = ({ id }: { id: string }) => {
  return useQuery([api.comment.get, id], () => getComment({ forum_id: id }), {
    enabled: !!id,
    select: ({ data }) => data.data,
    onError: (e: any) => {
      toastFail(e.response.data.error[0].name || "failed to access data");
    },
  });
};

const createComment = (commentDetails: IForumCommentReq) => {
  return httpClient.post(
    api.comment.post.replace("{forum_id}", commentDetails.id),
    commentDetails
  );
};

const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.comment.get);
      toastSuccess("Comment created sucessfuly");
    },
    onError: (e: any) => {
      toastFail(e.response.data.error[0].name || "Comment failed");
    },
  });
};

const getCommentById = ({ forum_id, id }: { forum_id: string; id: string }) => {
  return httpClient.get<SikaaiResponse<IForumComment[]>>(
    api.comment.getById.replace("{id}", id).replace("{forum_id}", forum_id)
  );
};

const useGetCommentById = ({
  forum_id,
  id,
}: {
  forum_id: string;
  id: string;
}) => {
  return useQuery(
    [api.comment.getById, id, forum_id],
    () => getCommentById({ forum_id, id }),
    {
      enabled: !!id && !!forum_id,
      select: ({ data }) => data?.data?.[0],
      onError: (e: any) => {
        toastFail(e.response.data.error[0].name || "Fetching Comment failed");
      },
    }
  );
};

const updateComment = (commentDetails: IForumCommentUpdateReq) => {
  return httpClient.patch(
    api.comment.patch
      .replace("{forum_id}", commentDetails.forum_id)
      .replace("{id}", commentDetails.id),
    commentDetails
  );
};

const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.comment.get);
      queryClient.invalidateQueries(api.comment.getById);
      toastSuccess("Comment updated successfuly");
    },
    onError: () => {
      toastFail("Failed updating comment");
    },
  });
};

const deleteComment = (forumCommentParams: IForumCommentDelParams) => {
  return httpClient.delete(
    api.comment.delete
      .replace("{forum_id}", forumCommentParams.forum_id)
      .replace("{id}", forumCommentParams.id)
  );
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.comment.get);
      toastSuccess("Comment deleted successfuly");
    },
  });
};

export {
  useGetComment,
  useCreateComment,
  useGetCommentById,
  useUpdateComment,
  useDeleteComment,
};

import { Box } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import { ForumQuestion } from "@sikaai/components/forumQuestion";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useGetForum } from "@sikaai/service/sikaai-forum";
import { sikaai_colors } from "@sikaai/theme/color";

const Forum = () => {
  //react queries
  // const { data: datae } = useGetForum();
  const datae = [
    {
      id: 0,
      question_text: "what is this",
      question_image: "string",
      code: "string",
      created_by: 0,
      created_at: "2023-05-08T11:04:23.388Z",
      total_comments: "This is quest",
      is_deleted: true,
      is_locked: true,
      is_active: true,
    },
  ];

  return (
    <>
      <BreadCrumb
        items={[]}
        title={{ name: "Forum", route: `${NAVIGATION_ROUTES.FORUM}` }}
      />
      <Box width={"100%"} backgroundColor={sikaai_colors.white} p={6}>
        {datae?.map((item: any) => {
          return <ForumQuestion key={item.id} item={item} />;
        })}
      </Box>
    </>
  );
};
export default Forum;

import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { sikaai_colors } from "@sikaai/theme/color";

const ForumAnswer = () => {
  return (
    <>
      <BreadCrumb
        title={{ name: "Forum", route: `${NAVIGATION_ROUTES.FORM}` }}
        items={[
          {
            name: `Answer`,
            route: NAVIGATION_ROUTES.FORUM_ANSWER,
          },
        ]}
      />

      <Box backgroundColor={sikaai_colors.white} p={4} borderRadius={10}>
        <Flex alignItems={"center"} gap={3}>
          <Image
            borderRadius="full"
            boxSize="36px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HWZUxsf5n832kg8v768mpz3uIy2UDzIRTADmhqD6Xg&s"
            alt="Dan Abramov"
          />

          <Text>
            m rem aperiam, eaque ipsa quae ab illo inventore veritatis...m rem
            aperiam, eaque ipsa quae ab illo inventore veritatis...m rem
            aperiam, eaque ipsa quae ab illo inventore veritatis...m rem
            aperiam, eaque ipsa q?
          </Text>
        </Flex>
        <Box marginLeft={45}>
          <Flex gap={3}>
            <Text color={"blue"}>Christina Shrestha</Text>
            <Text color={sikaai_colors.gray_text}>10 minutes</Text>
          </Flex>
        </Box>
        <Flex mt={3} gap={3} direction={"column"}>
          <Text color={sikaai_colors.primary_dark}>Your Answer</Text>
          <Input placeholder="write your answer" />
          <Flex gap={2} alignItems={"center"}>
            <Text>Pin</Text>
            <Switch />
          </Flex>
          <Input type={"file"} />
          <Button>Post</Button>
        </Flex>
      </Box>

      <Box
        backgroundColor={sikaai_colors.white}
        p={4}
        borderRadius={10}
        mt={10}
      >
        <Flex justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={sikaai_colors.primary}>
            Comment
          </Text>
          <Select width={"140px"} size={"xs"} color={sikaai_colors.primary}>
            <option>Most Recent</option>
            <option>All Comment</option>
          </Select>
        </Flex>
        <Box>
          <Flex gap={2}>
            <Image
              borderRadius="full"
              boxSize="36px"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HWZUxsf5n832kg8v768mpz3uIy2UDzIRTADmhqD6Xg&s"
              alt="Dan Abramov"
            />
            <Box>
              <Text>Admin</Text>
              <Text fontSize={"xs"}>1 min ago</Text>
            </Box>
          </Flex>
          <Box borderBottom={"1px solid gray"} ml={10}>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
              perspiciatis perferendis amet in commodi eveniet, itaque incidunt
              corrupti ea enim aliquam dignissimos fugiat ad reiciendis expedita
              fugit suscipit sint ipsam! Dolores non facilis magni voluptate
              ipsam nostrum, eius, mollitia natus, ratione voluptates voluptas
              iure cum cupiditate sunt praesentium adipisci sapiente quibusdam
              officiis magnam laudantium inventore ad suscipit itaque repellat?
              Odio. Quia nam sit ipsam! Necessitatibus aut recusandae eveniet
              modi enim ipsa et sed ut quos, magni a omnis nostrum sequi porro
              minima laboriosam tempora.
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForumAnswer;

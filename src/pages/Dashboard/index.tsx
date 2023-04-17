import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  ActiveUsersIcon,
  TotalAddIcon,
  TotalQuesCreatedIcon,
} from "@sikaai/assets/svgs";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import { sikaai_colors } from "@sikaai/theme/color";

const Dashboard = () => {
  return (
    <>
      <BreadCrumb items={[]} title={"Dashboard"} />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem bg={sikaai_colors.white} borderRadius={"16px"}>
          <Flex padding={4} gap={4}>
            <ActiveUsersIcon />
            <Box>
              <Text fontWeight={500} fontSize={"16px"}>
                Active users
              </Text>
              <Text
                fontWeight={700}
                fontSize={"20px"}
                color={sikaai_colors.primary_dark}
              >
                114
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem bg={sikaai_colors.white} borderRadius={"16px"}>
          <Flex padding={4} gap={4}>
            <TotalQuesCreatedIcon />
            <Box>
              <Text fontWeight={500} fontSize={"16px"}>
                Total questions created
              </Text>
              <Text
                fontWeight={700}
                fontSize={"20px"}
                color={sikaai_colors.primary_dark}
              >
                114
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem bg={sikaai_colors.white} borderRadius={"16px"}>
          <Flex padding={4} gap={4}>
            <TotalAddIcon />
            <Box>
              <Text fontWeight={500} fontSize={"16px"}>
                Total Advertisements
              </Text>
              <Text
                fontWeight={700}
                fontSize={"20px"}
                color={sikaai_colors.primary_dark}
              >
                114
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;

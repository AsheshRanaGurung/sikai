import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  ActiveUsersIcon,
  TotalAddIcon,
  TotalQuesCreatedIcon,
  TotalRepliesIcon,
} from "@sikaai/assets/svgs";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import { sikaai_colors } from "@sikaai/theme/color";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Legend,
  ResponsiveContainer,
  Pie,
} from "recharts";

import DataTable from "@sikaai/components/common/table";
import { useMemo } from "react";
import {
  useGetDashboardCard,
  useGetStudent,
} from "@sikaai/service/service-dashboard";

const Dashboard = () => {
  //react query
  const { data: studentDetails = [], isFetching } = useGetStudent();
  const { data: dashboardCardData } = useGetDashboardCard();
  // react query end
  const dataArea = dashboardCardData?.monthly_onboard_students
    ? Object.entries(dashboardCardData?.monthly_onboard_students).map(
        ([key, value]) => {
          return {
            name: key,
            Total: value,
          };
        }
      )
    : [];

  const dataPie = [
    {
      name: "Basic",
      value: dashboardCardData?.basic_advertisements,
      fill: "rgba(232, 232, 232, 1)",
    },
    {
      name: "Advanced",
      value: dashboardCardData?.advance_advertisements,
      fill: "rgba(88, 95, 205, 1)",
    },
    {
      name: "Premium",
      value: dashboardCardData?.premium_advertisements,
      //
      fill: "rgba(251, 166, 57, 1)",
    },
  ];

  const cardsData = useMemo(
    () => [
      {
        cardTitle: "Active Students",
        cardNumber: dashboardCardData?.active_students || 0,
        cardIcons: <ActiveUsersIcon />,
      },
      // {
      //   cardTitle: "Active Teachers",
      //   cardNumber: 114,
      //   cardIcons: <ActiveTeacherIcon />,
      // },
      {
        cardTitle: "Total Questions Created",
        cardNumber: dashboardCardData?.total_questions || 0,
        cardIcons: <TotalQuesCreatedIcon />,
      },
      {
        cardTitle: "Pending Forum Replies",
        cardNumber: dashboardCardData?.pending_forum_replies || 0,
        cardIcons: <TotalRepliesIcon />,
      },
      {
        cardTitle: "Active Advertisements",
        cardNumber: dashboardCardData?.active_advertisements || 0,
        cardIcons: <TotalAddIcon />,
      },
    ],
    [dashboardCardData]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Full name",
        accessor: "full_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
      },
      {
        Header: "College",
        accessor: "college",
      },
      {
        Header: "Date",
        accessor: "created_at",
      },
    ],
    []
  );
  return (
    <>
      <BreadCrumb items={[]} title={{ name: "Dashboard", route: "/" }} />
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {cardsData?.map(item => {
          return (
            <GridItem
              key={item?.cardTitle}
              bg={sikaai_colors.white}
              borderRadius={"16px"}
            >
              <Flex padding={4} gap={4}>
                {item?.cardIcons}
                <Box>
                  <Text fontWeight={500} fontSize={"16px"}>
                    {item?.cardTitle}
                  </Text>
                  <Text
                    fontWeight={700}
                    fontSize={"20px"}
                    color={sikaai_colors.primary_dark}
                  >
                    <>{item?.cardNumber}</>
                  </Text>
                </Box>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
      <Box mb={5}>
        <Grid templateColumns="repeat(1, 4fr 2fr)" gap={6} marginTop={"20px"}>
          <GridItem
            w={"100%"}
            h={"400px"}
            borderRadius={"16px"}
            background={sikaai_colors.white}
            p={4}
          >
            <Text
              color={sikaai_colors.light_gray_text}
              fontSize={"sm"}
              fontWeight={"bold"}
            >
              MONTHLY STUDENTS ONBOARD
            </Text>
            <ResponsiveContainer width={"100%"}>
              <AreaChart
                data={dataArea}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={sikaai_colors.graph_stroke}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={sikaai_colors.graph_stroke}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="gray" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Total"
                  stroke={sikaai_colors.primary_dark}
                  fillOpacity={1}
                  fill="url(#total)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </GridItem>
          <GridItem
            w={"100%"}
            height="400px"
            borderRadius={"16px"}
            background={sikaai_colors.white}
            p={4}
          >
            <Text
              color={sikaai_colors.light_gray_text}
              fontSize={"sm"}
              fontWeight={"bold"}
            >
              ADVERTISEMENT STATISTICS
            </Text>
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <PieChart>
                <Pie
                  data={dataPie}
                  cx={250}
                  cy={160}
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={0}
                  dataKey="value"
                />
                <Tooltip />
                <Legend
                  align="center"
                  formatter={value => (
                    <span style={{ color: sikaai_colors.black }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </GridItem>
        </Grid>
      </Box>

      <Box background={sikaai_colors.white} borderRadius={12} p={1}>
        <Text
          fontWeight={"bold"}
          color={sikaai_colors.gray_text}
          p={"16px 16px 4px 16px"}
        >
          Recent Student Onboard
        </Text>
        <DataTable
          data={studentDetails}
          columns={columns}
          loading={isFetching}
        />
      </Box>
    </>
  );
};

export default Dashboard;

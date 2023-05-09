import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import {
  ActiveTeacherIcon,
  ActiveUsersIcon,
  TotalAddIcon,
  TotalQuesCreatedIcon,
  TotalRepliesIcon,
} from "@sikaai/assets/svgs";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import { sikaai_colors } from "@sikaai/theme/color";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import DataTable from "@sikaai/components/common/table";
import { useMemo } from "react";
import TableActions from "@sikaai/components/common/table/TableActions";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

const labels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "DEC",
];

//data for line graph
const data_line = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Student",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 5000 })),
      borderColor: sikaai_colors.primary,
      backgroundColor: "rgba(207, 202, 255, 1)",
    },
  ],
};
// options for line graph
const options_line = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "MONTHLY CUSTOMER ONBOARD",
    },
  },
};

// options for doghnut graph
const options_doghnut = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "ADVERTISEMENT STATISTICS",
    },
  },
};
//data for doghnut
const data_doghnut = {
  labels: ["Premium", "Advanced", "Basic"],
  datasets: [
    {
      label: "Adertisement Percent",
      data: [50, 20, 30],
      backgroundColor: [
        "rgba(251, 166, 57, 1)",
        "rgba(88, 95, 205, 1)",
        "rgba(232, 232, 232, 1)",
      ],
    },
  ],
};

const cardsData = [
  {
    cardTitle: "Active Students",
    cardNumber: 114,
    cardIcons: <ActiveUsersIcon />,
  },
  {
    cardTitle: "Active Teachers",
    cardNumber: 114,
    cardIcons: <ActiveTeacherIcon />,
  },
  {
    cardTitle: "Total Questions Created",
    cardNumber: 114,
    cardIcons: <TotalQuesCreatedIcon />,
  },
  {
    cardTitle: "Pending Forum Replies",
    cardNumber: 114,
    cardIcons: <TotalRepliesIcon />,
  },
  {
    cardTitle: "Active Advertisements",
    cardNumber: 114,
    cardIcons: <TotalAddIcon />,
  },
];

const Dashboard = () => {
  //columns name
  const columns = useMemo(
    () => [
      {
        Header: "Full name",
        accessor: "fullName",
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
        accessor: "phoneNumber",
      },
      {
        Header: "College",
        accessor: "college",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Action",
        Cell: () => {
          const onDelete = () => {
            console.log("here");
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onDelete={onDelete} />
            </Stack>
          );
        },
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
                    {item?.cardNumber}
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
            display="flex"
            justifyContent="center"
            alignItems={"center"}
          >
            <Line options={options_line} data={data_line} />
          </GridItem>
          <GridItem
            w={"100%"}
            height="400px"
            borderRadius={"16px"}
            background={sikaai_colors.white}
            p={4}
            display="flex"
            justifyContent="center"
            alignItems={"center"}
          >
            <Doughnut options={options_doghnut} data={data_doghnut} />
          </GridItem>
        </Grid>
      </Box>

      <Box background={sikaai_colors.white} borderRadius={12} p={4}>
        <Text fontWeight={"bold"} color={sikaai_colors.gray_text}>
          Recent Student Onboard
        </Text>
        <DataTable
          data={[
            {
              fullName: "Arya Stark",
              email: "email@email.com",
              address: "America",
              phoneNumber: "93239235124",
              college: "ABC college",
            },
            {
              fullName: "Arya Stark",
              email: "email@email.com",
              address: "America",
              phoneNumber: "93239235124",
              college: "ABC college",
            },
          ]}
          columns={columns}
        />
      </Box>
    </>
  );
};

export default Dashboard;

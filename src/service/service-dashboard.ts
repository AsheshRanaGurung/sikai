import { useQuery } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail } from "./service-toast";

export interface IStudentDetails {
  email: string;
  full_name: string;
  address: string;
  profile_picture: any;
  college: any;
  phone_number: string;
  created_at: string;
}

export interface IDashboardCard {
  active_students: number;
  total_questions: number;
  pending_forum_replies: number;
  active_advertisements: number;
  premium_advertisements: number;
  advance_advertisements: number;
  basic_advertisements: number;
  monthly_onboard_students: any;
}
const getStudent = () => {
  return httpClient.get<SikaaiResponse<IStudentDetails[]>>(api.dashboard.get);
};

const useGetStudent = () => {
  return useQuery(api.dashboard.get, getStudent, {
    select: ({ data }) => data.data,
    onError: (e: any) => {
      toastFail(e.response?.data.message || "Couldnot fetch student data");
    },
  });
};

const getDashboardCard = () => {
  return httpClient.get<SikaaiResponse<IDashboardCard[]>>(api.dashboard.card.get);
};
const useGetDashboardCard = () => {
  return useQuery(api.dashboard.card.get, getDashboardCard, {
    select: ({ data }) => data?.data?.[0],
    onError: (e: any) => {
      toastFail(e.response?.data.message || "Couldnot fetch dashboard data");
    },
  });
};

export { useGetStudent, useGetDashboardCard };

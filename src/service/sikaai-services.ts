import { useQuery } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail } from "./service-toast";

export interface IServiceResponse {
  id: number;
  name: string;
  description: string;
}

const getServices = () => {
  return httpClient.get<SikaaiResponse<IServiceResponse[]>>(api.service.get);
};

const useGetServices = () => {
  return useQuery([api.service.get], getServices, {
    select: ({ data }) => data.data,
    onError: (error: any) => {
      toastFail(error.response?.data.message || "");
    },
  });
};

export { useGetServices };

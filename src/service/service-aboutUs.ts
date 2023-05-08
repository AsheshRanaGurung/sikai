import { useQuery } from "react-query";
import { SikaaiResponse, api } from "./service-api";
import { httpClient } from "./service-axois";

export interface IAboutUs {
  content: string;
  video: string;
}

const fetchAboutUs = () => {
  return httpClient.get<SikaaiResponse<IAboutUs[]>>(api.about.fetch);
};

const useFetchAboutUs = () => {
  return useQuery([api.about.fetch], fetchAboutUs, {
    select: data => data?.data?.data,
  });
};

export { useFetchAboutUs };

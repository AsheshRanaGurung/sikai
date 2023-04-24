import { useQuery } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";

// verbal ability
const getModule = (id: string) => () => {
  return httpClient.get<SikaaiResponse<[]>>(api.module.get.replace("{id}", id));
};

const useGetModule = (id: string) => {
  return useQuery([api.module.get, id], getModule(id), {
    select: ({ data }) => data.data,
  });
};

export { useGetModule };

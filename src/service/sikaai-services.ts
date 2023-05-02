import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface IServiceReq {
  name: string;
  description: string;
}

export interface IServiceResponse extends IServiceReq {
  id: string;
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

const getServiceById = (id: string) => () => {
  return httpClient.get<SikaaiResponse<IServiceResponse[]>>(
    api.service.getById.replace("{id}", id)
  );
};

const useGetServiceById = (id: string) => {
  return useQuery([api.service.getById, id], getServiceById(id), {
    enabled: !!id,
    select: ({ data }) => data.data[0],
    // onSuccess: () => {
    //   toastSuccess("Fetched service successfuly");
    // },
  });
};

const updateServices = (serviceDetails: IServiceResponse) => {
  return httpClient.patch<SikaaiResponse<IServiceResponse>>(
    api.service.patch.replace("{id}", serviceDetails.id),
    serviceDetails
  );
};

const useUpdateServices = () => {
  const queryClient = useQueryClient();
  return useMutation(updateServices, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.service.get);
      toastSuccess("Successfuly updated service");
    },
    onError: () => {
      toastFail("Couldnot update the service");
    },
  });
};

export { useGetServices, useUpdateServices, useGetServiceById };

import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface IAdvertisementReq {
  name: string;
  ad_type: string;
  description: string;
  banner: string;
  ad_link: string;
  display_status: boolean;
}

export interface IAdvertisementResponse extends IAdvertisementReq {
  id: number;
}

const getAdvertisement = () => {
  return httpClient.get<SikaaiResponse<IAdvertisementResponse[]>>(
    api.advertisement.get
  );
};

const useGetAdvertisement = () => {
  return useQuery([api.advertisement.get], getAdvertisement, {
    select: ({ data }) => data?.data,
    onError: () => {
      toastFail("Failed to load advertisement");
    },
  });
};

const createAdvertisement = (advertisementDetails: IAdvertisementResponse) => {
  return httpClient.post(api.advertisement.post, advertisementDetails);
};

const useCreateAdvertisement = () => {
  const queryClient = useQueryClient();
  return useMutation(createAdvertisement, {
    onSuccess: () => {
      toastSuccess("Advertisement created successfuly!");
      queryClient.invalidateQueries(api.advertisement.get);
    },
    onError: () => {
      toastFail("Couldnot create advertisement");
    },
  });
};

const getAdvertisementById = (id: string) => {
  return httpClient.get<SikaaiResponse<IAdvertisementResponse[]>>(
    api.advertisement.getById.replace("{id}", id)
  );
};

const useGetAdvertisementById = (id: string) => {
  return useQuery(
    [api.advertisement.getById, id],
    () => getAdvertisementById(id),
    {
      select: ({ data }) => data?.data[0],
      onError: () => {
        toastFail("Couldnot fetch advertisement");
      },
    }
  );
};

const updateAdvertisement = (advertisementDetails: IAdvertisementReq) => {
  return httpClient.patch(api.advertisement.patch, advertisementDetails);
};

const useUpdateAdvertisement = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAdvertisement, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.advertisement.get);
      toastSuccess("Advertisement updated Successfuly");
    },
    onError: () => {
      toastFail("Couldnot update Advertisement");
    },
  });
};

const deleteAdvertisement = (id: string) => {
  return httpClient.delete(api.advertisement.delete.replace("{id}", id));
};

const useDeleteAdvertisement = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAdvertisement, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.advertisement.get);
      toastSuccess("Advertisement deleted sucessfuly");
    },
  });
};

export {
  useGetAdvertisement,
  useCreateAdvertisement,
  useGetAdvertisementById,
  useUpdateAdvertisement,
  useDeleteAdvertisement,
};

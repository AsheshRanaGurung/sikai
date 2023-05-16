import { toFormData } from "@sikaai/utils/form-data";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface IAdvertisementReq {
  name: string;
  ad_type: string;
  description?: string;
  banner: Blob;
  ad_link?: string;
  display_status: boolean;
  page: string;
}

export interface IAdPlacementPages {
  id: string;
  name: string;
}

export interface IAdvertisementResponse
  extends Omit<IAdvertisementReq, "banner"> {
  id: number;
  banner: string;
}
export interface IAdvertisementUpdate extends IAdvertisementReq {
  id: string;
}

const getAdvertisement = (type: string) => {
  return httpClient.get<SikaaiResponse<IAdvertisementResponse[]>>(
    api.advertisement.get.replace("{type}", type)
  );
};

const useGetAdvertisement = (type: string) => {
  return useQuery([api.advertisement.get, type], () => getAdvertisement(type), {
    select: ({ data }) => data?.data,
    onError: () => {
      toastFail("Failed to load advertisement");
    },
  });
};

const createAdvertisement = (advertisementDetails: IAdvertisementReq) => {
  return httpClient.post(
    api.advertisement.post,
    toFormData(advertisementDetails)
  );
};

const useCreateAdvertisement = () => {
  const queryClient = useQueryClient();
  return useMutation(createAdvertisement, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.advertisement.get);
      toastSuccess("Advertisement created successfuly!");
    },
    onError: (e: any) => {
      toastFail(
        e?.response?.data?.error[0]?.name || "Couldnot create advertisement"
      );
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

const updateAdvertisement = (advertisementDetails: IAdvertisementUpdate) => {
  return httpClient.patch(
    api.advertisement.patch.replace("{id}", advertisementDetails.id),
    toFormData(advertisementDetails)
  );
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

const deleteAdvertisement = ({ id }: { id: string }) => {
  return httpClient.delete(api.advertisement.delete.replace("{id}", id));
};

const useDeleteAdvertisement = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAdvertisement, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.advertisement.get);
      toastSuccess("Advertisement deleted sucessfuly");
    },
    onError: (e: any) => {
      toastFail(e.response?.data.message || "Couldn't delete Ad");
    },
  });
};

const getAdPlacementPages = () => {
  return httpClient.get<SikaaiResponse<IAdPlacementPages[]>>(
    api.advertisement.adPlacement.get
  );
};

const useGetAdPlacementPages = () => {
  return useQuery([api.advertisement.adPlacement.get], getAdPlacementPages, {
    select: ({ data }) => data?.data,
    onError: (e: any) => {
      toastFail(e.response?.data.message || "Couldnot fetch data");
    },
  });
};

export {
  useGetAdvertisement,
  useCreateAdvertisement,
  useGetAdvertisementById,
  useUpdateAdvertisement,
  useDeleteAdvertisement,
  useGetAdPlacementPages,
};

import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, SikaaiResponse } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";

export interface IMap {
  id?: number;
  longitude: string;
  latitude: string;
}
export interface IContact {
  id: number;
  heading: string;
  description: string;
  created_at: string;
}

const getMapLocation = () => {
  return httpClient.get<SikaaiResponse<IMap[]>>(api.map.get);
};

const useGetMapLocation = () => {
  return useQuery([api.map.get], getMapLocation, {
    select: ({ data }) => {
      return data?.data;
    },
    onError: (e: any) => {
      toastFail(e.response?.data.message || "Couldn't load map");
    },
  });
};

const postMapLocation = (location: IMap) => {
  return httpClient.post(api.map.post, location);
};

const usePostMapLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(postMapLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.map.get);
    },
    onError: (e: any) => {
      toastFail(e?.response?.data?.error[0]?.name || "Location update failed");
    },
  });
};

const getContact = () => {
  return httpClient.get<SikaaiResponse<IContact[]>>(api.contact.get);
};

const useGetContact = () => {
  return useQuery([api.contact.get], getContact, {
    select: ({ data }) => data.data,
    onError: (error: any) => {
      toastFail(error.response?.data.message || "Couldn't fetch contact data");
    },
  });
};

const updateContact = (contactDetails: IContact) => {
  return httpClient.patch(
    api.contact.patch.replace("{id}", contactDetails.id.toString()),
    contactDetails
  );
};

const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation(updateContact, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.contact.get);
      toastSuccess("contact updated sucessfully");
    },
    onError: () => {
      toastFail("couldn't update the contact");
    },
  });
};
const getContactById = (id: string) => () => {
  return httpClient.get<SikaaiResponse<IContact[]>>(
    api.contact.getById.replace("{id}", id)
  );
};

const useGetContactById = (id: string) => {
  return useQuery([api.contact.getById, id], getContactById(id), {
    enabled: !!id,
    select: ({ data }) => data.data[0],
    // onSuccess: () => {
    //   toastSuccess("Fetched service successfuly");
    // },
  });
};

export {
  useGetMapLocation,
  usePostMapLocation,
  useUpdateContact,
  useGetContact,
  useGetContactById,
};

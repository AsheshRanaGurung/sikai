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

export interface ICourseResponse {
  id: number;
  name: string;
  description: string;
  service: number;
  course_info: CourseInfo;
  is_active: boolean;
  created_at: string;
}

export interface CourseInfo {
  deduction_mark: string;
  time_limit: string;
  total_questions: number;
}

const getServices = () => {
  return httpClient.get<SikaaiResponse<IServiceResponse[]>>(api.service.get);
};

const useGetServices = () => {
  return useQuery([api.service.get], getServices, {
    select: ({ data }) => data.data,
    onError: () => {
      toastFail("Failed to fetch services");
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

// course = subject in UI
const getServiceCourse = (serviceId: string) => {
  return httpClient.get<SikaaiResponse<ICourseResponse[]>>(
    api.service.course.get.replace("{service_id}", serviceId)
  );
};

const useGetServiceCourse = ({ serviceId }: { serviceId: string }) => {
  return useQuery(
    [api.service.course.get, serviceId],
    () => getServiceCourse(serviceId),
    {
      enabled: !!serviceId,
      select: ({ data }) => data?.data,
      onError: () => {
        toastFail("Subjects couldnot be fetched");
      },
    }
  );
};
export {
  useGetServices,
  useUpdateServices,
  useGetServiceById,
  useGetServiceCourse,
};

import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { api } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";
import TokenService, { TokenDetails } from "./service-token";

export interface LoginDetails {
  email: string;
  password: string;
}

export const authTokenKey = "authToken";

const initLogin = (loginData: LoginDetails) => {
  return httpClient.post<{ data: TokenDetails }>(api.user.login, loginData, {
    disableAuth: true,
  });
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(initLogin, {
    // TODO: remove this any
    onSuccess: (response: any) => {
      const tokens = {
        access_token: response.data.data[0].access,
        refresh_token: response.data.data[0].refresh,
      };
      TokenService.setToken(tokens);
      queryClient.setQueryData(authTokenKey, () => true);
      toastSuccess("Login Successful");
    },
    onError: error => {
      const loginErr = error as AxiosError<{ message: string; error: string }>;
      toastFail(
        loginErr.response?.data?.message ??
          loginErr.response?.data?.error ??
          "Login failed !"
      );
    },
  });
};

// const logout = async () => {
//   try {
//     await httpClient.get(api.user.logout);
//     return Promise.resolve(true);
//   } catch (error) {
//     if ((error as AxiosError).response?.status === httpStatus.UNAUTHORIZED) {
//       return Promise.resolve(true);
//     }
//     return Promise.resolve(false);
//   }
// };

// const useLogoutMutation = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   return useMutation(logout, {
//     onMutate() {
//       toastPromise(logout(), api.user.logout, "Logging out");
//     },
//     onSuccess() {
//       navigate("/");
//       queryClient.setQueryData(authTokenKey, () => false);
//       TokenService.clearToken();
//       queryClient.clear();
//       queryClient.removeQueries();
//     },

//     onError: (error: AxiosError<{ error: string; message: string }>) => {
//       toastFail(
//         error.response?.data?.message ??
//           error.response?.data?.error ??
//           "Logout Failed!"
//       );
//     }
//   });
// };

export { useLoginMutation };

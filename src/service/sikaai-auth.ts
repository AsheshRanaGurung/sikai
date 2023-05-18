import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { api } from "./service-api";
import { httpClient } from "./service-axois";
import { toastFail, toastSuccess } from "./service-toast";
import TokenService, { ITokenDetails, TokenDetails } from "./service-token";

export interface LoginDetails {
  email: string;
  password: string;
}

export const authTokenKey = "authToken";
const authTokenDetails = "authTokenDetails";

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

/**
 * Check if user is authenticated
 * @returns boolean
 */

const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  navigate("/");
  queryClient.setQueryData(authTokenKey, () => false);
  TokenService.clearToken();
  queryClient.clear();
  queryClient.removeQueries();
};

const checkAuthentication = () => {
  if (TokenService.isAuthenticated()) {
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

const useAuthentication = () => {
  const queryClient = useQueryClient();

  return useQuery([authTokenKey], checkAuthentication, {
    onSuccess: () => {
      const tokenDetails = TokenService.getTokenDetails();
      if (tokenDetails) {
        queryClient.setQueryData<ITokenDetails>(authTokenDetails, tokenDetails);
      }
    },
  });
};

export { useLoginMutation, useAuthentication, useLogoutMutation };

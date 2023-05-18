import { toastFail } from "./service-toast";

export interface TokenDetails {
  access_token: string;
  refresh_token: string;
}

export enum Authorities {
  "gateway" = "gateway",
  "vendor" = "vendor",
  "client" = "client",
}

export interface ITokenDetails {
  contactNo: string;
  email: string;
  userId: null | number;
  username: string;
  profilePic: string;
  role: string[];
  iat: number;
  schemeBased: boolean;

  workspace: Authorities;
  exp: number;
}

function setToken(token: TokenDetails) {
  try {
    localStorage.setItem("auth", JSON.stringify(token));
  } catch (e) {
    toastFail(`Error storing token: ${e}`);
  }
}

function getToken() {
  try {
    return JSON.parse(localStorage.getItem("auth") || "") as TokenDetails;
  } catch (e) {
    return null;
  }
}

function getTokenDetails() {
  try {
    const token = getToken();
    return token
      ? (JSON.parse(
          window.atob(token.access_token.split(".")[1])
        ) as ITokenDetails)
      : null;
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();

  if (tokenDetails) {
    return tokenDetails.exp * 1000 > Date.now();
  } else {
    return false;
  }
}

function clearToken() {
  localStorage.removeItem("auth");
}

const TokenService = {
  setToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  clearToken,
};

export default TokenService;

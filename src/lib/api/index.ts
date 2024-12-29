import { RequestMethod } from "@/types";

const createRequest = (method: RequestMethod, url: string) => ({
  method,
  url,
});

const BASE = "api/";
const AUTH_BASE = "users/";
export const AUTH_APIS = {
  signUp: createRequest("POST", BASE + AUTH_BASE + "signup"),
  login: createRequest("POST", BASE + AUTH_BASE + "login"),
  logout: createRequest("GET", BASE + AUTH_BASE + "logout"),
  verify: createRequest("POST", BASE + AUTH_BASE + "verify"),
  info: createRequest("POST", BASE + AUTH_BASE + "info"),
};

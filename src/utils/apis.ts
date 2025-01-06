import { RequestMethod } from "@/types";

const createRequest = (method: RequestMethod, url: string) => ({
  method,
  url,
});

const BASE = "/api/";

const AUTH_BASE = "users/";
export const AUTH_APIS = {
  signUp: createRequest("POST", BASE + AUTH_BASE + "signup"),
  login: createRequest("POST", BASE + AUTH_BASE + "login"),
  logout: createRequest("GET", BASE + AUTH_BASE + "logout"),
  verify: createRequest("POST", BASE + AUTH_BASE + "verify"),
  info: createRequest("GET", BASE + AUTH_BASE + "info"),
};

const CAMAPIGN_BASE = "campaign/";
export const CAMPAIGN_APIS = {
  getAllCampaigns: createRequest("POST", BASE + CAMAPIGN_BASE + "manager/"),
  saveCamapign: createRequest("POST", BASE + CAMAPIGN_BASE + "{page}"),
  getCampaignInfo: createRequest(
    "GET",
    BASE + CAMAPIGN_BASE + "{page}/?id={id}"
  ),
  uploadCampaignProspects: createRequest(
    "POST",
    BASE + CAMAPIGN_BASE + "prospects/upload"
  ),
  mapCampaignProspects: createRequest(
    "POST",
    BASE + CAMAPIGN_BASE + "prospects/mapping"
  ),
  getCampaignUploadedProspects: createRequest(
    "GET",
    BASE + CAMAPIGN_BASE + "prospects/upload?campaignId={id}"
  ),
  getCampaignRegisteredProspects: createRequest(
    "GET",
    BASE + CAMAPIGN_BASE + "prospects/?campaignId={id}"
  ),
};

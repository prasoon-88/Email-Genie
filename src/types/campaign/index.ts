import { ReactNode } from "react";

export type CampaignType = "job-application" | "inquiry";

export type CampaignCategory = {
  type: CampaignType;
  icon: ReactNode;
  title: string;
  description: string;
};

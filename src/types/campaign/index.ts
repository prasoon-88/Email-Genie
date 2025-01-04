import { ReactNode } from "react";
import { ALLOWED_CAMPAIGN_TYPE } from "@/models/campaign.model";

export type CampaignType = (typeof ALLOWED_CAMPAIGN_TYPE)[number];

export type CampaignCategory = {
  type: CampaignType;
  icon: ReactNode;
  heading: string;
  description: string;
  isActive?: boolean;
};

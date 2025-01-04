import { CampaignCategory } from "@/types/campaign";
import { BriefcaseBusiness, PackageCheck } from "lucide-react";

export const CAMPIGN_STEP_KEY = "step";

export const CAMPAIGN_CATEGORIES: CampaignCategory[] = [
  {
    type: "job-application",
    icon: <BriefcaseBusiness />,
    heading: "Job Application Campaign",
    description:
      "Send a personalized email to employers with your resume and cover letter to apply for specific job openings.",
  },
  {
    type: "inquiry",
    icon: <PackageCheck />,
    heading: "Job Inquiry Campaign",
    description:
      "Reach out to companies or recruiters to inquire about potential job opportunities or specific positions.",
  },
];

export const DEFAULT_COLS = [
  {
    label: "To email",
    value: "to",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Name",
    value: "Company",
  },
  {
    label: "Company Address",
    value: "company_address",
  },
];

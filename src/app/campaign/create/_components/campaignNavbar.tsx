import { Button } from "@/components/ui/button";
import { CAMPIGN_STEP_KEY } from "@/config/campaign";
import useURLSearchParams from "@/hooks/common/useURLSearchParams.hook";
import { useCamapignContext } from "@/providers/campaignProvider";
import { Container } from "lucide-react";
import React from "react";
import { CAMPAIGN_STEPS } from "../_helper/helper";

const CampaignNavbar = () => {
  const { campaignName } = useCamapignContext();
  const { getParams } = useURLSearchParams();
  const activeStep = getParams(CAMPIGN_STEP_KEY, 1);

  return (
    <div className="bg-zinc-900 border-b border-zinc-700 px-4 py-2 min-h-14 flex items-center justify-between gap-x-4 sticky top-0">
      <div className="flex items-center gap-x-2">
        <Container /> {campaignName}
      </div>
      <div className="flex gap-x-2">
        {CAMPAIGN_STEPS.map(({ icon, label, value }, index) => (
          <Button
            key={index}
            variant={value == activeStep ? "default" : "secondary"}
          >
            {icon}
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CampaignNavbar;

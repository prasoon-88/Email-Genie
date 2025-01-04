import { useCamapignContext } from "@/providers/campaignProvider";
import { Container } from "lucide-react";
import React from "react";

const CampaignNavbar = () => {
  const { campaignName } = useCamapignContext();
  return (
    <div className="bg-zinc-900 border-b border-zinc-700 px-4 py-2 min-h-14 flex items-center justify-between gap-x-4 sticky top-0">
      <div className="flex items-center gap-x-2">
        <Container /> {campaignName}
      </div>
    </div>
  );
};

export default CampaignNavbar;

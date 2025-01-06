"use client";

import React, { useEffect, useState } from "react";
import CampaignNavbar from "./_components/campaignNavbar";
import CampaignProvider from "@/providers/campaignProvider";
import useURLSearchParams from "@/hooks/common/useURLSearchParams.hook";
import { useToast } from "@/hooks/common/use-toast";
import axios from "axios";
import { CAMPAIGN_APIS } from "@/utils/apis";
import { usePathname } from "next/navigation";

const CampaignCreateLayout = ({ children }: { children: any }) => {
  const { toast } = useToast();
  const { getParams } = useURLSearchParams();

  const id = getParams("id");
  const pathName = usePathname();
  const [campaignName, setCampaignName] = useState("");

  const getCampaignSettings = async () => {
    try {
      const { url, method } = CAMPAIGN_APIS["getCampaignInfo"];
      const resp = await axios({
        method,
        url: url.replace("{page}", "settings").replace("{id}", id),
      });
      if (resp.data) {
        const { name } = resp?.data?.camapign ?? {};
        setCampaignName(name);
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;
      console.log(message);
      toast({
        title: message,
      });
    }
  };

  useEffect(() => {
    if (id && pathName != "settings") {
      getCampaignSettings();
    }
  }, [id]);

  return (
    <CampaignProvider value={{ setCampaignName, campaignName, id }}>
      <CampaignNavbar />
      {children}
    </CampaignProvider>
  );
};

export default CampaignCreateLayout;

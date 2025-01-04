"use client";

import React, { useEffect, useState } from "react";
import CampaignNavbar from "./_components/campaignNavbar";
import CampaignProvider from "@/providers/campaignProvider";
import useURLSearchParams from "@/hooks/common/useURLSearchParams.hook";
import { useToast } from "@/hooks/common/use-toast";
import axios from "axios";
import { CAMPAIGN_APIS } from "@/utils/apis";

const CampaignCreateLayout = ({ children }: { children: any }) => {
  const { toast } = useToast();
  const { getParams } = useURLSearchParams();

  const id = getParams("id");
  const step = getParams("step");
  const [campaignName, setCampaignName] = useState("");

  // const onRetrieveData = (data: any[]) => {
  //   const jsonData = convertArrayToJSON(data);
  //   console.log(jsonData);
  // };

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const file = e.target?.files?.[0];
  //   if (!file) {
  //     toast({ title: "File Not Found" });
  //     return;
  //   }
  //   const fileName = file?.name;
  //   const parser = getFileParser(fileName);
  //   if (!parser) {
  //     toast({ title: "File Not Supported" });
  //     return;
  //   }
  //   parser(file, onRetrieveData);
  // };

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
    if (id && step && step != "1") {
      getCampaignSettings();
    }
  }, [id]);

  return (
    <CampaignProvider value={{ setCampaignName, campaignName, id }}>
      <div>
        <CampaignNavbar />
        {children}
      </div>
    </CampaignProvider>
  );
};

export default CampaignCreateLayout;

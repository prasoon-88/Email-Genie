"use client";

import { Input } from "@/components/ui/input";
import { convertArrayToJSON, getFileParser } from "@/utils/parsing";
import React, { ChangeEvent, ReactNode, useState } from "react";
import CampaignNavbar from "./_components/campaignNavbar";
import CampaignProvider from "@/providers/campaignProvider";

const CampaignCreateLayout = ({ children }: { children: any }) => {
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

  return (
    <CampaignProvider value={{ setCampaignName, campaignName }}>
      <div>
        <CampaignNavbar />
        {children}
      </div>
    </CampaignProvider>
  );
};

export default CampaignCreateLayout;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CAMPAIGN_CATEGORIES, CAMPIGN_STEP_KEY } from "@/config/campaign";
import { useToast } from "@/hooks/common/use-toast";
import useURLSearchParams from "@/hooks/common/useURLSearchParams.hook";
import { useCamapignContext } from "@/providers/campaignProvider";
import { CampaignCategory, CampaignType } from "@/types/campaign";
import { CAMPAIGN_APIS } from "@/utils/apis";
import axios from "axios";
import clsx from "clsx";
import { ChevronRightIcon } from "lucide-react";
import React, { HTMLAttributes, useEffect, useState } from "react";

interface CampaignCategoryExtended
  extends CampaignCategory,
    HTMLAttributes<HTMLDivElement> {}

const Category = ({
  heading,
  icon,
  description,
  type,
  isActive,
  className,
  ...rest
}: CampaignCategoryExtended) => {
  return (
    <div
      className={clsx(
        "col-span-1 p-[1px] rounded-md border border-neutral-700 cursor-pointer hover:bg-zinc-900/20 active:bg-zinc-900/50 hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
        className,
        { "bg-gradient-to-r": isActive }
      )}
      {...rest}
    >
      <div className="p-5 bg-zinc-800 overflow-hidden rounded-md grid gap-y-2 h-full w-full">
        <div>{icon}</div>
        <div className="text-lg font-semibold text-pink-200">{heading}</div>
        <div className="text-sm text-blue-200">{description}</div>
      </div>
    </div>
  );
};

const CampaignCategories = ({
  acitve,
  setCategory,
}: {
  acitve?: CampaignType;
  setCategory: any;
}) => {
  return (
    <div className="grid gap-y-2 w-100">
      <div>Choose Email Type</div>
      <div className="grid grid-cols-2 gap-2">
        {CAMPAIGN_CATEGORIES.map((category, index) => (
          <Category
            key={index}
            {...category}
            isActive={acitve == category.type}
            onClick={() => setCategory(category.type)}
          />
        ))}
      </div>
    </div>
  );
};

const CampaignCreateSetting = () => {
  const { toast } = useToast();
  const { setSearchParams } = useURLSearchParams();

  const { campaignName, setCampaignName, id } = useCamapignContext();
  const [category, setCategory] = useState<CampaignType>();

  const onNext = async () => {
    try {
      const { url, method } = CAMPAIGN_APIS["saveCamapign"];
      const resp = await axios({
        url: url.replace("{page}", "settings"),
        method,
        data: {
          name: campaignName,
          category,
          id,
        },
      });
      if (resp.data) {
        const { _id } = resp.data?.campaign ?? {};
        if (!_id)
          toast({
            title: `Something went wrong`,
          });

        toast({
          title: `Campaign: ${campaignName} created/updated successfully`,
        });
        setSearchParams(
          new Map([
            ["id", _id],
            [CAMPIGN_STEP_KEY, "2"],
          ]),
          "/campaigns/create/prospect"
        );
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Camapign Create/Update Failed",
        description: error?.response?.data?.message,
      });
    }
  };

  const getCampaignSettings = async () => {
    if (!id) return;
    try {
      const { url, method } = CAMPAIGN_APIS["getCampaignInfo"];
      const resp = await axios({
        method,
        url: url.replace("{page}", "settings").replace("{id}", id),
      });
      if (resp.data) {
        const { name, category } = resp?.data?.camapign ?? {};
        setCategory(category);
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

  useEffect(() => {
    if (id) {
      getCampaignSettings();
    }
  }, [id]);

  return (
    <div className="h-screen grid p-4">
      <div className="w-full md:w-6/12 xl:w-4/12 mx-auto pt-10 flex flex-col gap-4">
        {/* Camapign Name */}
        <Label htmlFor="campaginName" className="grid gap-y-1">
          <p className="text-sm text-slate-300">Camapign Name </p>
          <Input
            required
            autoFocus
            id="campaginName"
            placeholder="Enter Email"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </Label>
        {/* Camapign Categories */}
        <CampaignCategories setCategory={setCategory} acitve={category} />
        <Button variant="outline" onClick={onNext}>
          {" "}
          Next <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default CampaignCreateSetting;

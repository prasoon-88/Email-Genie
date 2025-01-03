import { CAMPAIGN_CATEGORIES } from "@/config/campaign";
import { CampaignCategory } from "@/types/campaign";
import React from "react";

const Category = ({ title, icon, description, type }: CampaignCategory) => {
  return (
    <div className="col-span-3 p-[1px] rounded-md border border-neutral-700 cursor-pointer hover:bg-zinc-900/20 active:bg-zinc-900/50 hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="p-5 bg-zinc-800 overflow-hidden rounded-md grid gap-y-2">
        <div>{icon}</div>
        <div className="text-lg font-semibold text-neutral-300">{title}</div>
        <div className="text-sm text-blue-100">{description}</div>
      </div>
    </div>
  );
};

const CampaignCategories = () => {
  return (
    <div className="grid gap-y-4">
      <div className="text-2xl text-red-100 font-bold">Choose Email Type</div>
      <div className="grid grid-cols-12 gap-4">
        {CAMPAIGN_CATEGORIES.map((category, index) => (
          <Category key={index} {...category} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="px-8 py-6">
      <CampaignCategories />
    </div>
  );
};

export default Home;

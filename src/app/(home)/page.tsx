import { CAMPAIGN_CATEGORIES } from "@/config/campaign";
import { CampaignCategory } from "@/types/campaign";
import React, { ReactNode } from "react";

const Category = ({ title, icon, description, type }: CampaignCategory) => {
  return (
    <div className="col-span-3 p-[1px] rounded-md border border-neutral-700 cursor-pointer hover:bg-zinc-900/20 active:bg-zinc-900/50 hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="p-5 bg-zinc-800 overflow-hidden rounded-md grid gap-y-2">
        <div>{icon}</div>
        <div className="text-lg font-semibold text-pink-200">{title}</div>
        <div className="text-sm text-blue-200">{description}</div>
      </div>
    </div>
  );
};

const CampaignCategories = () => {
  return (
    <Section title="Choose Email Type">
      <div className="grid grid-cols-12 gap-4">
        {CAMPAIGN_CATEGORIES.map((category, index) => (
          <Category key={index} {...category} />
        ))}
      </div>
    </Section>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="grid gap-y-4">
      <div className="text-2xl text-stone-100 font-bold">{title}</div>
      {children}
    </div>
  );
};

const Campaigns = () => {
  return (
    <Section title="Campaigns">
      <div className="text-center text-neutral-500">
        You don’t have any campaigns yet
      </div>
    </Section>
  );
};
const Home = () => {
  return (
    <div className="px-8 py-6 grid gap-y-8">
      <CampaignCategories />
      <Campaigns />
    </div>
  );
};

export default Home;

import { Cog, House, SunSnow } from "lucide-react";
import { Tab } from ".";

const Base = "/";

export const SIDE_PANEL_STORAGE_KEY = "panel";

export const SIDE_PANEL_WIDTH = {
  shrink: 80,
  expand: 300,
};

export const SIDE_PANEL_TABS: Tab[] = [
  {
    label: "Home",
    icon: <House />,
    link: Base,
  },
  {
    label: "Campaigns",
    icon: <SunSnow />,
    link: Base + "campaign-manager/",
  },
  {
    label: "Settings",
    icon: <Cog />,
    link: Base + "settings/",
  },
];

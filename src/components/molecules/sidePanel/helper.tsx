import { Cog, House, Target } from "lucide-react";
import { Tab } from ".";

const Base = "/app/";

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
    label: "Projects",
    icon: <Target />,
    link: Base + "projects/",
  },
  {
    label: "Settings",
    icon: <Cog />,
    link: Base + "settings/",
  },
];

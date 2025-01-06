import { Heart, Palette, ScanEye, Settings, Users } from "lucide-react";

export const CAMPAIGN_STEPS = [
  {
    label: "Settings",
    value: "settings",
    icon: <Settings />,
  },
  {
    label: "Prospects",
    value: "propsects",
    icon: <Users />,
  },
  {
    label: "Generation",
    value: "generation",
    icon: <Palette />,
  },
  {
    label: "Preview",
    value: "preview",
    icon: <Heart />,
  },
  {
    label: "Review",
    value: "review",
    icon: <ScanEye />,
  },
];

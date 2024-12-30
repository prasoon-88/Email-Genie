"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { memo, ReactNode, useCallback } from "react";
import { SIDE_PANEL_TABS } from "./helper";
import axios from "axios";
import { AUTH_APIS } from "@/utils/apis";
import { useRouter } from "next/navigation";
import { LogOut, Sparkles } from "lucide-react";

export type Tab = {
  label: string;
  icon: ReactNode;
  link: string;
};
export const Tab = ({ label, icon, link }: Tab) => {
  return (
    <Link href={link}>
      <Button
        size="lg"
        variant="secondary"
        className="justify-start gap-x-2 py-6 px-5 w-full"
      >
        {icon} <span>{label}</span>
      </Button>
    </Link>
  );
};

const SidePanel = memo(() => {
  const router = useRouter();

  const onLogout = useCallback(async () => {
    try {
      axios({
        ...AUTH_APIS["logout"],
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="bg-zinc-900 h-full p-6 overflow-y-auto flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-black flex items-center gap-x-2">
          EMAIL Geine
          <Sparkles />
        </h1>
        <div className="mt-10 flex flex-col gap-y-2">
          <Button size="lg" className="w-full mb-4">
            Create A Project
          </Button>
          {SIDE_PANEL_TABS.map((tab, index) => (
            <Tab key={index} {...tab} />
          ))}
        </div>
      </div>
      <Button
        size="lg"
        variant="destructive"
        className="justify-start gap-x-2"
        onClick={onLogout}
      >
        <LogOut />
        <span>Logout</span>
      </Button>
    </div>
  );
});

export default SidePanel;

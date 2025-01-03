"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HTMLAttributes, memo, ReactNode, useCallback, useMemo } from "react";
import { SIDE_PANEL_TABS, SIDE_PANEL_WIDTH } from "./helper";
import axios from "axios";
import { AUTH_APIS } from "@/utils/apis";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Newspaper,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import { useUserContent } from "@/providers/userProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getInitial } from "@/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import TooltipContainer from "../tooltip";

interface Toggler extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOpen: () => void;
}

const Toggler = ({ onOpen, isOpen, className, ...rest }: Toggler) => {
  return (
    <div
      className={clsx(
        "cursor-pointer grid items-center justify-center w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-900/50",
        className
      )}
      onClick={onOpen}
      {...rest}
    >
      {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </div>
  );
};

export type Tab = {
  label: string;
  icon: ReactNode;
  link: string;
  showOnlyIcon?: boolean;
  centerAlign?: boolean;
};

export const Tab = ({ label, icon, link, showOnlyIcon, centerAlign }: Tab) => {
  return (
    <Link href={link}>
      <Button
        size="lg"
        variant="secondary"
        className={clsx("gap-x-2 py-6 px-5 w-full justify-start", {
          "justify-center": centerAlign,
        })}
      >
        {icon} {!showOnlyIcon ? <span>{label}</span> : <></>}
      </Button>
    </Link>
  );
};

const UserBox = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();

  const { userInfo, isLoading } = useUserContent();
  const { name, email } = userInfo ?? {};
  const initial = useMemo(() => getInitial(name), [name]);

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
    <>
      <div className="flex gap-x-2 px-2 py-1 rounded-sm">
        <TooltipContainer tooltip={name}>
          <div className="w-12 rounded-sm grid items-center justify-center aspect-square bg-zinc-800">
            {initial}
          </div>
        </TooltipContainer>
        <div>
          <div className="text-zinc-300">{name}</div>
          <div className="text-zinc-500 text-sm">{email}</div>
        </div>
      </div>
      <Button
        size="lg"
        variant="destructive"
        onClick={onLogout}
        className="p-0"
      >
        <LogOut size={24} />
        {isOpen ? <span>Logout</span> : <></>}
      </Button>
    </>
  );
};

interface SidePanel extends Toggler {}

const SidePanel = memo((props: SidePanel) => {
  const { isOpen } = props;

  return (
    <div
      className={clsx(
        "bg-zinc-900 h-full flex flex-col justify-between absolute transition-all duration-200 ease-in-out text-nowrap",
        {
          "p-6": isOpen,
          "p-6 px-2": !isOpen,
        }
      )}
      style={{
        width: isOpen ? SIDE_PANEL_WIDTH.expand : SIDE_PANEL_WIDTH.shrink,
      }}
    >
      <Toggler
        {...props}
        className="absolute top-5"
        style={{ right: "-16px" }}
      />
      <div className="overflow-hidden">
        <h1 className="text-3xl font-black flex justify-center items-center gap-x-2 h-8">
          {isOpen ? "EMAIL Geine" : <></>}
          <Sparkles />
        </h1>

        <div className="mt-10 flex flex-col gap-y-2">
          <Button size="lg" className="w-full mb-4">
            <Newspaper />
            {isOpen ? <span>Create A Project</span> : <></>}
          </Button>
          {SIDE_PANEL_TABS.map((tab, index) => (
            <Tab
              key={index}
              {...tab}
              showOnlyIcon={!isOpen}
              centerAlign={!isOpen}
            />
          ))}
        </div>
      </div>
      <div className="w-100 grid gap-y-4">
        <hr className="text-blue-100" />
        <UserBox isOpen={isOpen} />
      </div>
    </div>
  );
});

export default SidePanel;

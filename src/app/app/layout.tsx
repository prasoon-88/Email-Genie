"use client";

import SidePanel from "@/components/molecules/sidePanel";
import { SIDE_PANEL_STORAGE_KEY } from "@/components/molecules/sidePanel/helper";
import useToggle from "@/hooks/common/use-toggle.hook";
import React, { ReactNode } from "react";

const layout = ({ children }: { children?: ReactNode }) => {
  const [isOpen, onToggleOpen] = useToggle(
    Boolean(sessionStorage.getItem(SIDE_PANEL_STORAGE_KEY))
  );

  const onToggle = () => {
    const currStatus = onToggleOpen();
    if (currStatus) sessionStorage.setItem(SIDE_PANEL_STORAGE_KEY, "true");
    else sessionStorage.removeItem(SIDE_PANEL_STORAGE_KEY);
  };

  return (
    <div className="h-screen">
      <SidePanel isOpen={isOpen} onOpen={onToggle} />
      <div className="h-full w-screen bg-neutral-800 ">{children}</div>
    </div>
  );
};

export default layout;

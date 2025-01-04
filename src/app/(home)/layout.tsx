"use client";

import SidePanel from "@/components/molecules/sidePanel";
import {
  SIDE_PANEL_STORAGE_KEY,
  SIDE_PANEL_WIDTH,
} from "@/components/molecules/sidePanel/helper";
import useToggle from "@/hooks/common/use-toggle.hook";
import UserProvider from "@/providers/userProvider";
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
    <UserProvider>
      <div className="h-screen">
        <SidePanel isOpen={isOpen} onOpen={onToggle} />
        <div
          className="h-full w-screen bg-zinc-800 transition-all duration-200 ease-in-out"
          style={{
            paddingLeft: isOpen
              ? SIDE_PANEL_WIDTH.expand
              : SIDE_PANEL_WIDTH.shrink,
          }}
        >
          {children}
        </div>
      </div>
    </UserProvider>
  );
};

export default layout;

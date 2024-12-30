import SidePanel from "@/components/molecules/sidePanel";
import React, { ReactNode } from "react";

const layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="grid grid-cols-12 gap-x-4 h-screen">
      <div className="col-span-3 h-full">
        <SidePanel />
      </div>
      <div className="col-span-9 h-full">{children}</div>
    </div>
  );
};

export default layout;

import SidePanel from "@/components/molecules/sidePanel";
import React, { ReactNode } from "react";

const layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="grid grid-cols-5 gap-x-4 h-screen">
      <div className="col-span-1 h-full">
        <SidePanel />
      </div>
      <div className="col-span-4 h-full">{children}</div>
    </div>
  );
};

export default layout;

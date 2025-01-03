import React, { ReactNode } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";

interface TooltipContainer {
  children?: ReactNode;
  tooltip?: ReactNode;
}

const TooltipContainer = ({ children, tooltip }: TooltipContainer) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipContainer;

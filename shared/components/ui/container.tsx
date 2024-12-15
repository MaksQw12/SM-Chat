import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={cn("w-[1280px] mx-auto", className)}>
      {children}
    </div>
  );
};

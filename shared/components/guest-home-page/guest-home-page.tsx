import React from "react";
import { Container } from "../ui/container";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const GuestHomePage: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div>
        <Container>
          <h1>Guest Home Page</h1>
        </Container>
      </div>
    </div>
  );
};

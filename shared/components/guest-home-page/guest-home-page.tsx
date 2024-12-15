import React from "react";
import { Container } from "../ui/container";

interface Props {
  className?: string;
}

export const GuestHomePage: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Container>
        <h1>Guest Home Page</h1>
      </Container>
    </div>
  );
};
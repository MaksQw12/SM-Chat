"use client";
import React, { useState } from "react";
import { cn } from "../lib/utils";
import { Container } from "./ui/container";
import { Title } from "./ui/title";
import { AuthModal } from "./modals/auth/auth-modal";
import { Button } from "./ui/button";
import { User } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <div
      className={cn(
        className,
        "bg-[hsl(38,44%,76%)] w-full h-[90px] flex align-center justify-between"
      )}
    >
      <Container className="flex justify-between">
        {/* Левая часть */}
        <div className="flex items-center">
          <img src="1.png" alt="logo" className="w-[80px]" />
          <Title text={"SM-Chat"} size="lg" className="font-bold" />
        </div>
        {/* Правая часть */}
        <div className="flex items-center">
          {
            <AuthModal
              open={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
            />
          }
          <Button variant={"default"} onClick={() => setOpenAuthModal(true)}>
            <User className="mr-0" size={20}/> Войти
          </Button>
        </div>
      </Container>
    </div>
  );
};

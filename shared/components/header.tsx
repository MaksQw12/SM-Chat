"use client";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Container } from "./ui/container";
import { Title } from "./ui/title";
import { AuthModal } from "./modals/auth/auth-modal";
import { Button } from "./ui/button";
import { CircleUserRound, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "./hooks/useAuth";
import { DecodedUser } from "../lib/decodeRefresh";


interface Props {
  className?: string;
  isAuth?: boolean;
  user?: DecodedUser | null;
  logout?: () => void;
}

export const Header: React.FC<Props> = ({ className, isAuth, user, logout }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);


  return (
    <div
      className={cn(
        className,
        'bg-[hsl(38,44%,76%)] w-full h-[90px] flex align-center justify-between',
      )}>
      <Container className="flex justify-between">
        {/* Левая часть */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img src="1.png" alt="logo" className="w-[80px]" />
          <Title text={'SM-Chat'} size="lg" className="font-bold" />
        </div>
        {/* Правая часть */}
        <div className="flex items-center">
          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="text-lg flex items-center cursor-pointer hover:bg-[hsl(38,56%,81%)] transition ease-in-out duration-300 px-2 py-1 rounded-lg">
                <img
                  src="profile-user.png "
                  alt="profile"
                  className="w-[40px] border rounded-full mr-2"
                />
                {user?.username}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <CircleUserRound />
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Настройки
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
              <Button variant={'default'} onClick={() => setOpenAuthModal(true)}>
                <User className="mr-0" size={20} /> Войти
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

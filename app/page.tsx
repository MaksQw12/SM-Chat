"use client";
import { AuthorizedHomePage } from "@/shared/components/authorized-home-page/authorized-home-page";
import { GuestHomePage } from "@/shared/components/guest-home-page/guest-home-page";
import { Header } from "@/shared/components/header";
import { useAuth } from "@/shared/components/hooks/useAuth";

export default function Home() {
  const { user, logout, isAuth } = useAuth();
  return (
    <div>
      <Header isAuth={isAuth} user={user} logout={logout} />
      {isAuth ? <AuthorizedHomePage /> : <GuestHomePage />}
    </div>
  );
}

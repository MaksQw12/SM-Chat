"use client";
import { AuthModal } from "@/shared/components/modals/auth/auth-modal";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <div>
      {
        <AuthModal
          open={openAuthModal}
          onClose={() => setOpenAuthModal(false)}
        />
      }
      <Button onClick={() => setOpenAuthModal(true)}>Button</Button>
    </div>
  );
}

import React from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");
  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white border-black-500 p-10">
        <DialogTitle>
          {type === "login" ? (
            <LoginForm onClose={handleClose} />
          ) : (
            <RegisterForm onClose={handleClose} />
          )}
          <hr />
          <Button variant={'secondary'} className="mt-3 w-full text-base h-[48px]" onClick={onSwitchType}>
            {type === "login" ? "Зарегистрироваться" : "Войти"}
          </Button>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

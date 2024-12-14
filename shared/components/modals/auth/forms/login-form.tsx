import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, FormLoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/shared/components/ui/title";
import { FormInput } from "@/shared/components/form-input/form-input";
import { Button } from "@/shared/components/ui/button";
import { loginUser } from "@/shared/services/user";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<FormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormLoginSchema) => {
    try {
      const resp = await loginUser(data.username, data.password);
      if (resp.status !== 200) throw Error();
      onClose?.();
      toast.success("Вы успешно вошли в аккаунт", { icon: "👋" });
    } catch (error) {
      console.log("Error [LOGIN]: ", error);
      toast.error("Неправильное имя пользователя или пароль", { icon: "❌" });
    }
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
       <div className="flex flex-col">
       <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <Title text="Вход в аккаунт" size="md" className="font-bold mb-4" />
            <p className="text-gray-400 text-base">
              Введите свое имя пользователя, чтобы войти в свой аккаунт.
            </p>
          </div>
          <img src="auth.png" alt="auth" className="max-w-[150px]" />
        </div>

        <span className="block h-1 bg-blue-500 my-4 mb-8"></span>
       </div>
        <FormInput name="username" label="Имя пользователя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <Button className="h-12 text-base">Войти</Button>
      </form>
    </FormProvider>
  );
};

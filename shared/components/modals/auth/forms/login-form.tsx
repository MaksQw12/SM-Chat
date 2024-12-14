import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, FormLoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/shared/components/title";
import { FormInput } from "@/shared/components/form-input";
import { Button } from "@/shared/components/ui/button";

interface Props {
  onClose: () => void;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<FormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormLoginSchema) => {
    console.log(data);
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <Title text="Вход в аккаунт" size="md" className="font-bold" />
          <p className="text-gray-400">
            Введите свою почту, чтобы войти в свой аккаунт{" "}
          </p>
        </div>
        <FormInput name="email" label="E-mail" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <Button className="h-12 text-base">Войти</Button>
      </form>
    </FormProvider>
  );
};

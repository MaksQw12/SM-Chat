import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, FormRegisterSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/shared/components/title";
import { Button } from "@/shared/components/ui/button";
import { FormInput } from "@/shared/components/form-input";

interface Props {
  onClose: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<FormRegisterSchema>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: FormRegisterSchema) => {
    console.log(data);
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="E-mail" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />
        <Button className="h-12 text-base">Зарегистрироваться</Button>
      </form>
    </FormProvider>
  );
};

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, FormRegisterSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/shared/components/ui/title";
import { Button } from "@/shared/components/ui/button";
import { FormInput } from "@/shared/components/form-input/form-input";
import { regUser } from "@/shared/services/user";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<FormRegisterSchema>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: FormRegisterSchema) => {
    try {
      const resp = await regUser(data.username, data.password);
      if (resp.status !== 201) throw Error("");
      onClose?.();
      toast.success("Вы успешно зарегистрировались", { icon: "👋" });
    } catch (error) {
      console.log("Error [REGISTER]: ", error);
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
              <Title text="Регистрация" size="md" className="font-bold mb-4" />
              <p className="text-gray-400 text-base">
                Пожалуйста заполните все поля для успешного создания аккаунта.
              </p>
            </div>
            <img src="auth.png" alt="auth" className="max-w-[150px]" />
          </div>

          <span className="block h-1 bg-blue-500 my-4 mb-8"></span>
        </div>
        <FormInput name="username" label="Имя пользователя" required />
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

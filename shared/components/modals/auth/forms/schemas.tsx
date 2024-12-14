import { z } from "zod";
export const passwordSchema = z
  .string()
  .min(6, { message: "Пароль должен быть не менее 6 символов!" });
export const formLoginSchema = z.object({
  username: z.string().min(6,{ message: "Имя пользователя должно содержать не менее 6 символов" }),
  password: passwordSchema,
});
export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают!",
    path: ["confirmPassword"],
  });
export type FormLoginSchema = z.infer<typeof formLoginSchema>;
export type FormRegisterSchema = z.infer<typeof formRegisterSchema>;

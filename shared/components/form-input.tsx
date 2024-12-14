import React from "react";
import { RequiredSymbol } from "./required-symbol";
import { Input } from "./ui/input";
import { ClearButton } from "./clear-buttom";
import { useFormContext } from "react-hook-form";
import { ErrorText } from "./error-text";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const value = watch(name);
  const errorText = errors[name]?.message as string;
  const isPassword =
    props.type === "password" || props.type === "confirmPassword";
  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props}/>
        {value && (
          <ClearButton
            onClick={onClickClear}
            className={isPassword ? "right-10" : ""}
          />
        )}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

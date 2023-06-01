import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useRef, useState } from "react";

const ERROR_DEFAULT = "Некорректный пароль";
const NAME_DEFAULT = "password";
const MIN_LENGTH_DEFAULT = 4;

interface IFormFieldPassword {
  errorText?: string;
  minLenght?: number;
  name?: string;
  icon?: string;
  editable?: boolean;
  initialValue?: string;
  placeholder?: string;
}

const PasswordInputTyped:
  | typeof PasswordInput
  | FC<{
      error?: boolean;
      errorText?: string;
    }> = (inputProps: any) => {
  return <PasswordInput {...inputProps} />;
};

export function useFormFieldPassword({
  minLenght,
  name,
  icon,
  editable,
  initialValue,
  ...props
}: IFormFieldPassword = {}) {
  const errorText = props.errorText ?? ERROR_DEFAULT;

  name = name ?? NAME_DEFAULT;
  minLenght = minLenght ?? MIN_LENGTH_DEFAULT;
  initialValue = initialValue ?? "";
  icon = icon ?? (editable ? "EditIcon" : undefined);
  editable = editable ?? icon === "EditIcon";

  const [password, setPassword] = useState(initialValue);
  const passwordTyped = useRef(false);
  const [valid, setValid] = useState(false);
  const [passwordError, setPasswordError] = useState(
    minLenght ? errorText : ""
  );

  useEffect(() => {
    if (!minLenght) {
      setPasswordError("");
      return;
    }

    if (!passwordTyped.current && password) {
      passwordTyped.current = true;
    }

    const newValid = password.length >= minLenght;

    setValid(newValid);
    setPasswordError(!newValid && passwordTyped.current ? errorText : "");
  }, [password]);

  return {
    field: (
      <PasswordInputTyped
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={name}
        error={!!passwordError && passwordTyped.current}
        errorText={passwordError}
        icon={icon as any}
      />
    ),
    value: password,
    valid,
    setValue: setPassword,
  };
}

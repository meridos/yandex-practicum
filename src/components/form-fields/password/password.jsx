import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";

const ERROR_DEFAULT = "Некорректный пароль";
const NAME_DEFAULT = "password";
const MIN_LENGTH_DEFAULT = 4;

export function useFormFieldPassword({
  errorText,
  minLenght,
  name,
  icon,
  initialValue,
} = {}) {
  name = name ?? NAME_DEFAULT;
  errorText = errorText ?? ERROR_DEFAULT;
  minLenght = minLenght ?? MIN_LENGTH_DEFAULT;
  initialValue = initialValue ?? "";

  const [password, setPassword] = useState(initialValue);
  const passwordTyped = useRef(false);
  const [valid, setValid] = useState();
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
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={name}
        error={!!passwordError && passwordTyped.current}
        errorText={passwordError}
        icon={icon}
      />
    ),
    value: password,
    valid,
  };
}

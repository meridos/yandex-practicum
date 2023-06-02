import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useRef, useState } from "react";

const ERROR_DEFAULT = "Некорректный email";
const NAME_DEFAULT = "email";
const PLACEHOLDER_DEFAULT = "E-mail";

interface IFormFieldEmail {
  errorText?: string;
  name?: string;
  initialValue?: string;
  placeholder?: string;
  editable?: boolean;
  icon?: string;
}

export const useFormFieldEmail = ({
  name,
  initialValue,
  placeholder,
  editable,
  icon,
  ...props
}: IFormFieldEmail = {}) => {
  const errorText = props.errorText ?? ERROR_DEFAULT;

  name = name ?? NAME_DEFAULT;
  placeholder = placeholder ?? PLACEHOLDER_DEFAULT;
  initialValue = initialValue ?? "";
  icon = icon ?? (editable ? "EditIcon" : undefined);
  editable = editable ?? icon === "EditIcon";

  const [email, setEmail] = useState(initialValue);
  const [emailError, setEmailError] = useState(errorText);
  const [valid, setValid] = useState(false);
  const emailTyped = useRef(false);
  const emailRef = useRef<HTMLInputElement>();
  const [isEdit, setIsEdit] = useState(!editable);

  const onEmailBlur = () => {
    setEmailError(valid ? "" : errorText);

    if (editable) {
      setIsEdit(false);
    }
  };

  const onEmailFocus = () => {
    setEmailError("");
  };

  const onIconClick = () => {
    if (editable) {
      setIsEdit(true);
    }

    setTimeout(() => emailRef.current!.focus(), 0);
  };

  useEffect(() => {
    if (email && !emailTyped.current) {
      emailTyped.current = true;
    }

    setValid(!!email && emailRef.current!.checkValidity());
  }, [email, emailRef]);

  return {
    field: (
      <Input
        ref={emailRef as any}
        type="email"
        placeholder={placeholder}
        value={email}
        name={name}
        error={!valid && !!emailError && emailTyped.current}
        errorText={emailError}
        disabled={!isEdit}
        noValidate={true}
        onChange={(e) => setEmail(e.target.value)}
        icon={icon as any}
        onBlur={onEmailBlur}
        onFocus={onEmailFocus}
        onIconClick={onIconClick}
      />
    ),
    value: email,
    valid,
    setValue: setEmail,
  };
};

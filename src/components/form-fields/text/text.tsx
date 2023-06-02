import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const ERROR_DEFAULT = "Введите значение";
const NAME_DEFAULT = "text";
const IS_REQUIRED_DEFAULT = false;

interface IFormFieldText {
  errorText?: string;
  name?: string;
  initialValue?: string;
  placeholder?: string;
  regex?: RegExp;
  isRequired?: boolean;
  editable?: boolean;
  icon?: string;
}

export function useFormFieldText({
  name,
  initialValue,
  placeholder,
  regex,
  isRequired,
  editable,
  icon,
  ...props
}: IFormFieldText = {}) {
  const errorText = props.errorText ?? ERROR_DEFAULT;

  name = name ?? NAME_DEFAULT;
  initialValue = initialValue ?? "";
  isRequired = isRequired ?? IS_REQUIRED_DEFAULT;
  icon = icon ?? (editable ? "EditIcon" : undefined);
  editable = editable ?? icon === "EditIcon";

  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState(false);
  const isTyped = useRef(false);
  const fieldRef = useRef<HTMLInputElement>();
  const [isEdit, setIsEdit] = useState(!editable);
  const [error, setError] = useState(errorText);

  const isValid = () => {
    if (isRequired && !value) {
      return false;
    }

    if (regex) {
      return regex.test(value);
    } else {
      return true;
    }
  };

  const onFieldBlur = () => {
    setError(valid ? "" : errorText);

    if (editable) {
      setIsEdit(false);
    }
  };

  const onFieldFocus = () => {
    setError("");
  };

  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onIconClick = () => {
    if (editable) {
      setIsEdit(true);
    }

    setTimeout(() => fieldRef.current!.focus(), 0);
  };

  useEffect(() => {
    if (value && !isTyped.current) {
      isTyped.current = true;
    }

    setValid(isValid());
  }, [value]);

  return {
    field: (
      <Input
        ref={fieldRef as any}
        type="text"
        placeholder={placeholder}
        value={value}
        name={name}
        error={!valid && !!error && isTyped.current}
        errorText={error}
        noValidate={true}
        icon={icon as any}
        disabled={!isEdit}
        onChange={onFieldChange}
        onBlur={onFieldBlur}
        onFocus={onFieldFocus}
        onIconClick={onIconClick}
      />
    ),
    value: value,
    valid,
    setValue,
  };
}

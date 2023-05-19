import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";

const ERROR_DEFAULT = "Введите значение";
const NAME_DEFAULT = "text";
const IS_REQUIRED_DEFAULT = false;

export function useFormFieldText({
  errorText,
  name,
  initialValue,
  placeholder,
  regex,
  isRequired,
  editable,
  icon,
} = {}) {
  name = name ?? NAME_DEFAULT;
  errorText = errorText ?? ERROR_DEFAULT;
  initialValue = initialValue ?? "";
  isRequired = isRequired ?? IS_REQUIRED_DEFAULT;
  icon = icon ?? (editable ? "EditIcon" : undefined);
  editable = editable ?? icon === "EditIcon";

  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState();
  const isTyped = useRef(false);
  const fieldRef = useRef();
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

  const onFieldChange = (e) => {
    setValue(e.target.value);
  };

  const onIconClick = () => {
    if (editable) {
      setIsEdit(true);
    }

    setTimeout(() => fieldRef.current.focus(), 0);
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
        ref={fieldRef}
        type="text"
        placeholder={placeholder}
        value={value}
        name={name}
        error={!valid && !!error && isTyped.current}
        errorText={error}
        noValidate={true}
        icon={icon}
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

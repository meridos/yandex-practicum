import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useEffect, useState } from "react";
import { useFormFieldEmail } from "../../../components/form-fields/email/email";
import { useFormFieldPassword } from "../../../components/form-fields/password/password";
import { useFormFieldText } from "../../../components/form-fields/text/text";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { updateProfile } from "../../../services/actions/profile";
import styles from "./details.module.css";

const initialPassword = "******";

export const ProfileDetailsPage: FC = () => {
  const {
    request: { error, loading },
    ...profile
  } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const [changedForm, setChangedForm] = useState<boolean>();
  const [valid, setValid] = useState<boolean>();

  const {
    field: nameField,
    valid: nameValid,
    value: name,
    setValue: setName,
  } = useFormFieldText({
    placeholder: "Имя",
    name: "name",
    errorText: "Введите имя",
    isRequired: true,
    editable: true,
  });
  const {
    field: emailField,
    valid: emailValid,
    value: email,
    setValue: setEmail,
  } = useFormFieldEmail({
    placeholder: "Логин",
    editable: true,
  });
  const {
    field: passwordField,
    valid: passwordValid,
    value: password,
    setValue: setPassword,
  } = useFormFieldPassword({
    editable: true,
    initialValue: initialPassword,
  });

  const onSave = useCallback(() => {
    const newPassword = password === initialPassword ? {} : { password };

    dispatch(updateProfile({ name, email, ...newPassword }));
  }, [name, email, password, dispatch]);
  const onCancel = useCallback(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPassword(initialPassword);
  }, [profile, setName, setEmail, setPassword]);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPassword(initialPassword);
  }, [profile.name, profile.email, setName, setEmail, setPassword]);

  useEffect(() => {
    setChangedForm(
      name !== profile.name ||
        email !== profile.email ||
        password !== initialPassword
    );
  }, [profile, name, email, password]);

  useEffect(() => {
    setValid(nameValid && emailValid && passwordValid);
  }, [nameValid, emailValid, passwordValid]);

  return (
    <div className={styles.container}>
      {nameField}
      {emailField}
      {passwordField}
      {error && <p className={styles.error}>{error}</p>}
      {changedForm && (
        <div className={styles.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            disabled={loading}
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            disabled={loading || !valid}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
};

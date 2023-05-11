import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormFieldPassword } from "../../../components/form-fields/password/password";
import styles from "./details.module.css";
import { useFormFieldText } from "../../../components/form-fields/text/text";
import { useFormFieldEmail } from "../../../components/form-fields/email/email";

export function ProfileDetailsPage() {
  const {
    field: nameField,
    valid: nameValid,
    value: name,
  } = useFormFieldText({
    placeholder: "Имя",
    name: "name",
    errorText: "Введите имя",
    isRequired: true,
    editable: true,
    initialValue: "Марк",
  });
  const {
    field: emailField,
    valid: emailValid,
    value: email,
  } = useFormFieldEmail({
    placeholder: "Логин",
    initialValue: "mail@stellar.burger",
    editable: true,
  });
  const {
    field: passwordField,
    valid: passwordValid,
    value: password,
  } = useFormFieldPassword({
    editable: true,
    initialValue: "------",
  });

  return (
    <div className={styles.container}>
      {nameField}
      {emailField}
      {passwordField}
    </div>
  );
}

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormFieldEmail } from "../../components/form-fields/email/email";
import { useFormFieldPassword } from "../../components/form-fields/password/password";
import { useFormFieldText } from "../../components/form-fields/text/text";
import styles from "./register.module.css";

export function RegisterPage() {
  const [formValid, setFormValid] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const {
    field: nameField,
    valid: nameValid,
    value: name,
  } = useFormFieldText({
    placeholder: "Имя",
    name: "name",
    errorText: "Введите имя",
    isRequired: true,
  });
  const {
    field: emailField,
    valid: emailValid,
    value: email,
  } = useFormFieldEmail();
  const {
    field: passwordField,
    valid: passwordValid,
    value: password,
  } = useFormFieldPassword({});

  useEffect(() => {
    setFormValid(nameValid && emailValid && passwordValid);
  }, [nameValid, emailValid, passwordValid]);

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      {nameField}
      {emailField}
      {passwordField}
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={!formValid}
      >
        Зарегистрироваться
      </Button>
      <div className={styles.links}>
        <div className="mb-4">
          <span className="mr-2 text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </span>
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </form>
  );
}

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormFieldEmail } from "../../components/form-fields/email/email";
import { useFormFieldPassword } from "../../components/form-fields/password/password";
import styles from "./login.module.css";

export function LoginPage() {
  const [formValid, setFormValid] = useState(false);

  const {
    field: passwordField,
    valid: passwordValid,
    value: password,
  } = useFormFieldPassword();

  const {
    field: emailField,
    valid: emailValid,
    value: email,
  } = useFormFieldEmail();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  useEffect(() => {
    setFormValid(!!emailValid && !!passwordValid);
  }, [emailValid, passwordValid]);

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className="text text_type_main-medium">Вход</h2>
      {emailField}
      {passwordField}
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={!formValid}
      >
        Войти
      </Button>

      <div className={styles.links}>
        <div className="mb-4">
          <span className="mr-2 text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </span>
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>

        <div className="mb-4">
          <span className="mr-2 text text_type_main-default text_color_inactive">
            Забыли пароль?
          </span>
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </form>
  );
}

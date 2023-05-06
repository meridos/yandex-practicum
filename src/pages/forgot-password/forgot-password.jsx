import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./forgot-password.module.css";

const EMAIL_ERROR = "Некорректный email";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(EMAIL_ERROR);
  const emailTyped = useRef(false);
  const [formValid, setFormValid] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onEmailBlur = (e) => {
    setEmailError(email && e.target.checkValidity() ? "" : EMAIL_ERROR);
  };

  useEffect(() => {
    setFormValid(!emailError);
  }, [emailError]);

  useEffect(() => {
    if (email && !emailTyped.current) {
      emailTyped.current = true;
    }
  }, [email]);

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <Input
        type="email"
        placeholder="Укажите e-mail"
        value={email}
        name="email"
        error={!!emailError && emailTyped.current}
        errorText={emailError}
        noValidate={true}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={onEmailBlur}
        onFocus={() => setEmailError()}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={!formValid}
      >
        Восстановить
      </Button>

      <div className={styles.links}>
        <div className="mb-4">
          <span className="mr-2 text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </span>
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </form>
  );
}

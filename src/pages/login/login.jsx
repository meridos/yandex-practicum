import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

const PASSWORD_ERROR = "Некорректный пароль";
const EMAIL_ERROR = "Некорректный email";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(EMAIL_ERROR);
  const emailTyped = useRef(false);

  const [password, setPassword] = useState("");
  const passwordTyped = useRef(false);
  const [passwordError, setPasswordError] = useState(PASSWORD_ERROR);

  const [formValid, setFormValid] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onEmailBlur = (e) => {
    setEmailError(email && e.target.checkValidity() ? "" : EMAIL_ERROR);
  };

  useEffect(() => {
    setFormValid(!emailError && !passwordError);
  }, [emailError, passwordError]);

  useEffect(() => {
    if (email && !emailTyped.current) {
      emailTyped.current = true;
    }
  }, [email]);

  useEffect(() => {
    if (password && !passwordTyped.current) {
      passwordTyped.current = true;
    }

    if (!password && passwordTyped.current) {
      setPasswordError(PASSWORD_ERROR);
    }

    if (password) {
      setPasswordError("");
    }
  }, [password]);

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        name="email"
        error={!!emailError && emailTyped.current}
        errorText={emailError}
        noValidate={true}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={onEmailBlur}
        onFocus={() => setEmailError()}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
        error={!!passwordError && passwordTyped.current}
        errorText={passwordError}
      />
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

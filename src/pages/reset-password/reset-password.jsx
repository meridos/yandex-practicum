import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./reset-password.module.css";
import { confirmReset } from "../../api/password-reset";

const PASSWORD_ERROR = "Некорректный пароль";
const CODE_ERROR = "Некорректный код";

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const passwordTyped = useRef(false);
  const [passwordError, setPasswordError] = useState(PASSWORD_ERROR);

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(CODE_ERROR);
  const codeTyped = useRef(false);

  const [formValid, setFormValid] = useState(false);
  const [errorForm, setErrorForm] = useState();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    confirmReset(password, code)
      .then((e) => {
        navigate("/login", { replace: true });
      })
      .catch(() => {
        setErrorForm("Ошибка восстановления");
      });
  };

  const onCodeBlur = (e) => {
    setCodeError(code ? "" : CODE_ERROR);
  };

  useEffect(() => {
    setFormValid(!codeError && !passwordError);
  }, [codeError, passwordError]);

  useEffect(() => {
    if (code && !codeTyped.current) {
      codeTyped.current = true;
    }
  }, [code]);

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
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <PasswordInput
        placeholder="Введите новый пароль"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
        error={!!passwordError && passwordTyped.current}
        errorText={passwordError}
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        value={code}
        name="code"
        error={!!codeError && codeTyped.current}
        errorText={codeError}
        noValidate={true}
        onChange={(e) => setCode(e.target.value)}
        onBlur={onCodeBlur}
        onFocus={() => setCodeError()}
      />
      {errorForm && <p className={styles.errorText}>{errorForm}</p>}
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

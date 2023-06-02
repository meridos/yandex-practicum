import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { confirmReset } from "../../api/password-reset";
import { useFormFieldPassword } from "../../components/form-fields/password/password";
import { useFormFieldText } from "../../components/form-fields/text/text";
import styles from "./reset-password.module.css";
import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE } from "../../const/routes";

export const ResetPasswordPage: FC = () => {
  const [formValid, setFormValid] = useState(false);
  const [errorForm, setErrorForm] = useState<string>();
  const { state } = useLocation();

  const navigate = useNavigate();
  const {
    field: passwordField,
    valid: passwordValid,
    value: password,
  } = useFormFieldPassword({
    placeholder: "Введите новый пароль",
    errorText: "Некорректный пароль",
  });

  const {
    field: codeField,
    valid: codeValid,
    value: code,
  } = useFormFieldText({
    placeholder: "Введите код из письма",
    name: "code",
    errorText: "Некорректный код",
    isRequired: true,
    regex: /.{4,}/,
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    confirmReset({ password, token: code })
      .then((e) => {
        navigate(LOGIN_ROUTE, { replace: true });
      })
      .catch(() => {
        setErrorForm("Ошибка восстановления");
      });
  };

  useEffect(() => {
    if (!state?.fromForgotPassword) {
      navigate(FORGOT_PASSWORD_ROUTE, { replace: true });
    }
  }, [state]);

  useEffect(() => {
    setFormValid(codeValid && passwordValid);
  }, [codeValid, passwordValid]);

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      {passwordField}
      {codeField}
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
          <Link to={LOGIN_ROUTE} className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </form>
  );
};

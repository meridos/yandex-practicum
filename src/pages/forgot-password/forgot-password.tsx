import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { passwordReset } from "../../api/password-reset";
import { useFormFieldEmail } from "../../components/form-fields/email/email";
import { LOGIN_ROUTE, RESET_PASSWORD_ROUTE } from "../../const/routes";
import styles from "./forgot-password.module.css";

export const ForgotPasswordPage: FC = () => {
  const [errorForm, setErrorForm] = useState();

  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    passwordReset({ email })
      .then(() => {
        navigate(RESET_PASSWORD_ROUTE, { state: { fromForgotPassword: true } });
      })
      .catch((e) => {
        setErrorForm(e?.message || "Ошибка восстановления");
      });
  };

  const {
    field: emailField,
    valid: emailValid,
    value: email,
  } = useFormFieldEmail({ placeholder: "Укажите e-mail" });

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      {emailField}
      {errorForm && <p className={styles.errorText}>{errorForm}</p>}
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={!emailValid}
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

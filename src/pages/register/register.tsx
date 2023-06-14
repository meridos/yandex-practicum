import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormFieldEmail } from "../../components/form-fields/email/email";
import { useFormFieldPassword } from "../../components/form-fields/password/password";
import { useFormFieldText } from "../../components/form-fields/text/text";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../const/routes";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { register } from "../../services/actions/profile";
import styles from "./register.module.css";

export const RegisterPage: FC = () => {
  const [formValid, setFormValid] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isRegister, error, loading } = useAppSelector((state) => ({
    isRegister: !!state.profile.name,
    error: state.profile.request.error,
    loading: state.profile.request.loading,
  }));

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

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      dispatch(register({ password, email, name }));
    },
    [dispatch, password, email, name]
  );

  useEffect(() => {
    if (isRegister) {
      navigate(HOME_ROUTE, { replace: true });
    }
  }, [isRegister, navigate]);

  useEffect(() => {
    setFormValid(nameValid && emailValid && passwordValid);
  }, [nameValid, emailValid, passwordValid]);

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      {nameField}
      {emailField}
      {passwordField}
      {error && <p className={styles.error}>{error}</p>}
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={!formValid || loading}
      >
        Зарегистрироваться
      </Button>
      <div className={styles.links}>
        <div className="mb-4">
          <span className="mr-2 text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </span>
          <Link to={LOGIN_ROUTE} className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </form>
  );
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";

import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import ErrorBoundary from "../error-boundary/error-boundary";
import styles from "./app.module.css";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import { NotFoundPage } from "../../pages/not-found/not-found";

export default function App() {
  const dispatch = useDispatch();
  const overlayError = useSelector((state) => state.error.overlayError);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <ErrorBoundary error={overlayError}>
      <div className={styles.wrapper}>
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

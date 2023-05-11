import { useSelector } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { NotFoundPage } from "../../pages/not-found/not-found";
import { ProfileDetailsPage } from "../../pages/profile/details/details";
import { ProfileOrdersPage } from "../../pages/profile/orders/orders";
import { ProfilePage } from "../../pages/profile/profile";
import { RegisterPage } from "../../pages/register/register";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import AppHeader from "../app-header/app-header";
import ErrorBoundary from "../error-boundary/error-boundary";
import styles from "./app.module.css";

export default function App() {
  const overlayError = useSelector((state) => state.error.overlayError);

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
            <Route path="/profile" element={<ProfilePage />}>
              <Route path="" element={<ProfileDetailsPage />} />
              <Route path="orders" element={<ProfileOrdersPage />} />
            </Route>
            <Route path="/ingredient/:productId" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

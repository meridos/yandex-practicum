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
import { LogoutPage } from "../../pages/profile/logout/details";
import { ProtectedRouteElement } from "../protected/protected-route-element";

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
            <Route
              path="/register"
              element={
                <ProtectedRouteElement
                  element={<RegisterPage />}
                  authRestricted={true}
                />
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRouteElement
                  element={<ForgotPasswordPage />}
                  authRestricted={true}
                />
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteElement
                  element={<ResetPasswordPage />}
                  authRestricted={true}
                />
              }
            />
            <Route
              path="/profile"
              element={<ProtectedRouteElement element={<ProfilePage />} />}
            >
              <Route path="" element={<ProfileDetailsPage />} />
              <Route path="orders" element={<ProfileOrdersPage />} />
              <Route path="logout" element={<LogoutPage />} />
            </Route>
            <Route path="/ingredient/:productId" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

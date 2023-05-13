import { useSelector } from "react-redux";

import { Route, Routes, useLocation } from "react-router-dom";
import BurgerIngredientModal from "../../pages/burger-ingredient/burger-ingredient";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { NotFoundPage } from "../../pages/not-found/not-found";
import { ProfileDetailsPage } from "../../pages/profile/details/details";
import { LogoutPage } from "../../pages/profile/logout/details";
import { ProfileOrdersPage } from "../../pages/profile/orders/orders";
import { ProfilePage } from "../../pages/profile/profile";
import { RegisterPage } from "../../pages/register/register";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import AppHeader from "../app-header/app-header";
import ErrorBoundary from "../error-boundary/error-boundary";
import { ProtectedRouteElement } from "../protected/protected-route-element";
import styles from "./app.module.css";

export default function App() {
  const overlayError = useSelector((state) => state.error.overlayError);
  const location = useLocation();

  return (
    <ErrorBoundary error={overlayError}>
      <div className={styles.wrapper}>
        <AppHeader />
        <Routes location={location.state?.backgroundLocation || location}>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {location.state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredient/:productId"
              element={<BurgerIngredientModal />}
            />
          </Routes>
        )}
      </div>
    </ErrorBoundary>
  );
}

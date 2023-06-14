import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  FEED_ITEM_ROUTE,
  FEED_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  INGREDIENT_ITEM_ROUTE,
  LOGIN_ROUTE,
  PROFILE_LOGOUT_ROUTE,
  PROFILE_ORDERS_ITEM_ROUTE,
  PROFILE_ORDERS_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "../../const/routes";
import { useAppSelector } from "../../hooks/store";
import { BurgerIngredientModal } from "../../pages/burger-ingredient/burger-ingredient-modal";
import BurgerIngredientPage from "../../pages/burger-ingredient/burger-ingredient-page";
import { FeedPage } from "../../pages/feed/feed";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { NotFoundPage } from "../../pages/not-found/not-found";
import { OrderDetailsPage } from "../../pages/order-details/order-details";
import { OrderDetailsModal } from "../../pages/order-details/order-details-modal";
import { ProfileDetailsPage } from "../../pages/profile/details/details";
import { LogoutPage } from "../../pages/profile/logout/details";
import { ProfileOrdersPage } from "../../pages/profile/orders/orders";
import { ProfilePage } from "../../pages/profile/profile";
import { RegisterPage } from "../../pages/register/register";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { AppHeader } from "../app-header/app-header";
import ErrorBoundary from "../error-boundary/error-boundary";
import { ProtectedRouteElement } from "../protected/protected-route-element";
import styles from "./app.module.css";

export const App: FC = () => {
  const overlayError = useAppSelector((state) => state.error.overlayError);
  const location = useLocation();

  return (
    <ErrorBoundary error={overlayError}>
      <div className={styles.wrapper}>
        <AppHeader />
        <Routes location={location.state?.backgroundLocation || location}>
          <Route path={HOME_ROUTE} element={<HomePage />} />
          <Route path={LOGIN_ROUTE} element={<LoginPage />} />
          <Route
            path={REGISTER_ROUTE}
            element={
              <ProtectedRouteElement
                element={<RegisterPage />}
                authRestricted={true}
              />
            }
          />
          <Route
            path={FORGOT_PASSWORD_ROUTE}
            element={
              <ProtectedRouteElement
                element={<ForgotPasswordPage />}
                authRestricted={true}
              />
            }
          />
          <Route
            path={RESET_PASSWORD_ROUTE}
            element={
              <ProtectedRouteElement
                element={<ResetPasswordPage />}
                authRestricted={true}
              />
            }
          />
          <Route
            path={PROFILE_ROUTE}
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          >
            <Route path="" element={<ProfileDetailsPage />} />
            <Route
              path={PROFILE_ORDERS_ROUTE}
              element={<ProfileOrdersPage />}
            />
            <Route path={PROFILE_LOGOUT_ROUTE} element={<LogoutPage />} />
          </Route>
          <Route path={FEED_ROUTE} element={<FeedPage />} />
          <Route path={FEED_ITEM_ROUTE} element={<OrderDetailsPage />} />
          {!location.state?.backgroundLocation && (
            <>
              <Route
                path={INGREDIENT_ITEM_ROUTE}
                element={<BurgerIngredientPage />}
              />
              <Route
                path={PROFILE_ORDERS_ITEM_ROUTE}
                element={<OrderDetailsPage />}
              />
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {location.state?.backgroundLocation && (
          <Routes>
            <Route
              path={INGREDIENT_ITEM_ROUTE}
              element={<BurgerIngredientModal />}
            />
            <Route
              path={PROFILE_ORDERS_ITEM_ROUTE}
              element={<OrderDetailsModal />}
            />
          </Routes>
        )}
      </div>
    </ErrorBoundary>
  );
};

import { useSelector } from "react-redux";

import { Route, Routes, useLocation } from "react-router-dom";
import { BurgerIngredientModal } from "../../pages/burger-ingredient/burger-ingredient-modal";
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
import { AppHeader } from "../app-header/app-header";
import ErrorBoundary from "../error-boundary/error-boundary";
import { ProtectedRouteElement } from "../protected/protected-route-element";
import styles from "./app.module.css";
import {
  FEED_ITEM_ROUTE,
  FEED_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  INGREDIENT_ROUTE,
  LOGIN_ROUTE,
  PROFILE_LOGOUT_ROUTE,
  PROFILE_ORDERS_ITEM_ROUTE,
  PROFILE_ORDERS_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "../../const/routes";
import BurgerIngredientPage from "../../pages/burger-ingredient/burger-ingredient-page";
import { IState } from "../../models";
import { FC } from "react";
import { FeedPage } from "../../pages/feed/feed";
import { OrderDetails } from "../../pages/order-details/order-details";

export const App: FC = () => {
  const overlayError = useSelector<IState, IState["error"]["overlayError"]>(
    (state) => state.error.overlayError
  );
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
          <Route path={FEED_ITEM_ROUTE} element={<OrderDetails />}></Route>
          <Route
            path={PROFILE_ORDERS_ITEM_ROUTE}
            element={<OrderDetails />}
          ></Route>
          {!location.state?.backgroundLocation && (
            <Route
              path={INGREDIENT_ROUTE + "/:productId"}
              element={<BurgerIngredientPage />}
            />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {location.state?.backgroundLocation && (
          <Routes>
            <Route
              path={INGREDIENT_ROUTE + "/:productId"}
              element={<BurgerIngredientModal />}
            />
          </Routes>
        )}
      </div>
    </ErrorBoundary>
  );
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";

import { RouterProvider } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import ErrorBoundary from "../error-boundary/error-boundary";
import styles from "./app.module.css";
import { router } from "./app-router";

export default function App() {
  const dispatch = useDispatch();
  const overlayError = useSelector((state) => state.error.overlayError);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <ErrorBoundary error={overlayError}>
      <div className={styles.wrapper}>
        <AppHeader />
        <RouterProvider router={router} />
      </div>
    </ErrorBoundary>
  );
}

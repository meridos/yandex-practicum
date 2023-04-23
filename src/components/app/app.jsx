import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ErrorBoundary from "../error-boundary/error-boundary";
import styles from "./app.module.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import AppHeader from "../app-header/app-header";

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
        <DndProvider backend={HTML5Backend}>
          <main className={styles.container}>
            <div className={styles.side}>
              <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
              </h1>
              <BurgerIngredients />
            </div>
            <div className={styles.constructorContainer}>
              <BurgerConstructor />
            </div>
          </main>
        </DndProvider>
      </div>
    </ErrorBoundary>
  );
}

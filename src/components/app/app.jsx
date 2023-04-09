import React, { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/data";
import ErrorBoundary from "../error-boundary/error-boundary";

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredients(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <ErrorBoundary error={error}>
      <div className={styles.wrapper}>
        <AppHeader />
        <main className={styles.container}>
          <div className={styles.side}>
            <h1 className="text text_type_main-large mt-10 mb-5">
              Соберите бургер
            </h1>
            <BurgerIngredients ingredients={ingredients} />
          </div>
          <div className={styles.constructorContainer}>
            <BurgerConstructor ingredients={ingredients} />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

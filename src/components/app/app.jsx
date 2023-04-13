import React, { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import getIngredients from "../../api/get-ingredients";
import ErrorBoundary from "../error-boundary/error-boundary";
import IngredientsContext from "../../contexts/ingredients-context";

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
      <IngredientsContext.Provider value={ingredients}>
        <div className={styles.wrapper}>
          <AppHeader />
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
        </div>
      </IngredientsContext.Provider>
    </ErrorBoundary>
  );
}

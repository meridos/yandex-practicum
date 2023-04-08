import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
export default class App extends React.Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

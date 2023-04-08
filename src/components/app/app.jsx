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

        <div className={styles.container}>
          <div className={styles.side}>
            <BurgerIngredients />
          </div>
          <div className={styles.side}>
            <BurgerConstructor />
          </div>
        </div>
      </>
    );
  }
}

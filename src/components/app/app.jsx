import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
export default class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader />

        <div className={styles.container}>
          <BurgerIngredients />
        </div>
      </>
    );
  }
}

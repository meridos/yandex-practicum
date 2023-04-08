import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "./utils/data";
export default class App extends React.Component {
  constructor(props) {
    super(props);

    const ingredients = getIngredients();

    this.state = {
      ingredients,
      cartIngredients: ingredients.slice(-5),
    };
  }

  render() {
    return (
      <>
        <AppHeader />

        <main className={styles.container}>
          <div className={styles.side}>
            <h1 className="text text_type_main-large mt-10 mb-5">
              Соберите бургер
            </h1>
            <BurgerIngredients ingredients={this.state.ingredients} />
          </div>
          <div className={styles.constructorContainer}>
            <BurgerConstructor ingredients={this.state.cartIngredients} />
          </div>
        </main>
      </>
    );
  }
}

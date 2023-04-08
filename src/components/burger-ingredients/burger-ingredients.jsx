import React from "react";
import styles from "./burger-ingredients.module.css";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: "one",
    };
    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(currentTab) {
    this.setState({ currentTab });
  }

  render() {
    return (
      <>
        <div className={styles.tabs}>
          <Tab
            value="one"
            active={this.state.currentTab === "one"}
            onClick={this.onTabClick}
          >
            Булки
          </Tab>
          <Tab
            value="two"
            active={this.state.currentTab === "two"}
            onClick={this.onTabClick}
          >
            Соусы
          </Tab>
          <Tab
            value="three"
            active={this.state.currentTab === "three"}
            onClick={this.onTabClick}
          >
            Начинки
          </Tab>
        </div>

        <div className={styles.productList}>
          <h2 className={styles.title}>Булки</h2>

          <section className={styles.productItem}>
            <div className={styles.productItemCount}>
              <Counter count={1} size="default" />
            </div>
            <img src="" className={styles.productItemImg} />
            <p className={styles.productItemPrice}>
              <span className="mr-2">20</span>
              <CurrencyIcon type="primary" />
            </p>
            <h4 className="text text_type_main-default">
              Краторная булка N-200i
            </h4>
          </section>
          <section className={styles.productItem}>
            <Counter count={1} size="default" />
            <img src="" className={styles.productItemImg} />
            <p className={styles.productItemPrice}>
              <span className="mr-2">20</span>
              <CurrencyIcon type="primary" />
            </p>
            <h4 className="text text_type_main-default">
              Краторная булка N-200i
            </h4>
          </section>
          <section className={styles.productItem}>
            <Counter count={1} size="default" />
            <img src="" className={styles.productItemImg} />
            <p className={styles.productItemPrice}>
              <span className="mr-2">20</span>
              <CurrencyIcon type="primary" />
            </p>
            <h4 className="text text_type_main-default">
              Краторная булка N-200i
            </h4>
          </section>
        </div>
      </>
    );
  }
}

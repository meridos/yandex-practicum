import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ProductItemType } from "../app/utils/data";

const ingredientTypesMap = {
  main: "Мясо",
  bun: "Булки",
  sauce: "Соусы",
};
export default class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: "one",
      groupProducts: this.getProductsList(props.ingredients),
    };

    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(currentTab) {
    this.setState({ currentTab });
  }

  getProductsList(ingredients) {
    if (!ingredients) {
      return [];
    }

    const typesGroupMap = new Map();

    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      const typeIngredients = typesGroupMap.get(ingredient.type) || [];

      typeIngredients.push(ingredient);

      typesGroupMap.set(ingredient.type, typeIngredients);
    }

    return Array.from(typesGroupMap).map(([type, typeIngredients]) => ({
      typeTitle: ingredientTypesMap[type],
      ingredients: typeIngredients,
    }));
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

        <div className={styles.categoriesList}>
          {this.state.groupProducts.map(({ typeTitle, ingredients }) => (
            <React.Fragment key={typeTitle}>
              <h2 className={styles.title}>{typeTitle}</h2>
              <div className={styles.productList}>
                {ingredients.map((ingredient) => (
                  <React.Fragment key={ingredient._id}>
                    <ProductItem count={1} ingredient={ingredient} />
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </>
    );
  }
}
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ProductItemType).isRequired,
};

function ProductItem(props) {
  return (
    <section className={styles.productItem}>
      <div className={styles.productItemCount}>
        {props.count ? <Counter count={props.count} size="default" /> : null}
      </div>
      <img src={props.ingredient.image} className={styles.productItemImg} />
      <p className={styles.productItemPrice}>
        <span className="mr-2">{props.ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <h4 className="text text_type_main-default">{props.ingredient.name}</h4>
    </section>
  );
}
ProductItem.propTypes = {
  count: PropTypes.number,
  ingredient: ProductItemType,
};

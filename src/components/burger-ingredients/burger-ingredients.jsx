import React, { useState, useEffect } from "react";
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

export default function BurgerIngredients(props) {
  const [currentTab, setCurrentTab] = useState("one");
  const [groupProducts, setGroupProducts] = useState([]);

  useEffect(() => {
    setGroupProducts(getProductsList(props.ingredients));
  }, [props.ingredients]);

  function onTabClick(currentTab) {
    setCurrentTab(currentTab);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <Tab value="one" active={currentTab === "one"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="two" active={currentTab === "two"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="three" active={currentTab === "three"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>

      <div className={styles.categoriesList}>
        {groupProducts.map(({ typeTitle, ingredients }) => (
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
    </div>
  );
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
      <img
        src={props.ingredient.image}
        className={styles.productItemImg}
        alt={props.ingredient.name}
      />
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

function getProductsList(ingredients) {
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

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ProductItemType } from "../../utils/data";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const ingredientTypesMap = {
  main: "Начинки",
  bun: "Булки",
  sauce: "Соусы",
};
const tabs = ["bun", "sauce", "main"].map((type) => ({
  type,
  title: ingredientTypesMap[type],
}));

export default function BurgerIngredients(props) {
  const [currentTab, setCurrentTab] = useState("bun");
  const [groupProducts, setGroupProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  const categoriesRefs = {
    main: useRef(),
    bun: useRef(),
    sauce: useRef(),
  };

  useEffect(() => {
    setGroupProducts(getProductsList(props.ingredients));
  }, [props.ingredients]);

  useEffect(() => {
    categoriesRefs[currentTab]?.current?.scrollIntoView();
  }, [currentTab]);

  function onTabClick(currentTab) {
    setCurrentTab(currentTab);
  }

  function onProductClick(ingredient) {
    setProductDetails(ingredient);
  }

  return (
    <div className={styles.wrapper}>
      <Tabs currentTab={currentTab} onChange={onTabClick} />

      <div className={styles.categoriesList}>
        {groupProducts.map(({ type, title, ingredients }) => (
          <React.Fragment key={type}>
            <h2 className={styles.title} ref={categoriesRefs[type]}>
              {title}
            </h2>
            <div className={styles.productList}>
              {ingredients.map((ingredient) => (
                <React.Fragment key={ingredient._id}>
                  <ProductItem
                    count={1}
                    ingredient={ingredient}
                    onClick={() => onProductClick(ingredient)}
                  />
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      {productDetails && (
        <Modal header="Детали ингредиента" onClose={() => onProductClick(null)}>
          <IngredientDetails ingredient={productDetails} />
        </Modal>
      )}
    </div>
  );
}
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ProductItemType).isRequired,
};

const ProductItem = React.memo((props) => {
  return (
    <section className={styles.productItem} onClick={props.onClick}>
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
});
ProductItem.propTypes = {
  ingredient: ProductItemType.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number,
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

  const indexTabMap = tabs.reduce((res, { type }, i) => {
    res[type] = i;

    return res;
  }, {});

  return Array.from(typesGroupMap)
    .map(([type, typeIngredients]) => ({
      type: type,
      title: ingredientTypesMap[type],
      ingredients: typeIngredients,
    }))
    .sort((a, b) => indexTabMap[a.type] - indexTabMap[b.type]);
}

function Tabs(props) {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ type, title }) => (
        <Tab
          key={type}
          value={type}
          active={props.currentTab === type}
          onClick={props.onChange}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
}
Tabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentTab: PropTypes.oneOf(["main", "bun", "sauce"]).isRequired,
};

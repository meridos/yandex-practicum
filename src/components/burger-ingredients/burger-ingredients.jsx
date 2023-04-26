import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemType } from "../../utils/common-prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";
import { useDrag } from "react-dnd";
import { CLOSE_DETAILS, OPEN_DETAILS } from "../../services/actions/details";

const ingredientTypesMap = {
  main: "Начинки",
  bun: "Булки",
  sauce: "Соусы",
};
const tabs = ["bun", "sauce", "main"].map((type) => ({
  type,
  title: ingredientTypesMap[type],
}));

export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState("bun");
  const [scrollTab, setScrollTab] = useState("bun");
  const [groupProducts, setGroupProducts] = useState([]);
  const ingredients = useSelector((state) => state.ingredients.data);
  const ref = useRef();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) =>
    state.ingredients.data.find(
      (ingredient) => ingredient._id === state.details.ingredient
    )
  );
  const countsMap = useSelector((state) =>
    state.cart.ingredients.reduce((map, { id }) => {
      map.set(id, (map.get(id) || 0) + 1);

      return map;
    }, new Map(state.cart.bun ? [[state.cart.bun, 2]] : []))
  );

  const categoriesRefs = {
    main: useRef(),
    bun: useRef(),
    sauce: useRef(),
  };

  useEffect(() => {
    setGroupProducts(getProductsList(ingredients));
  }, [ingredients]);

  useEffect(() => {
    categoriesRefs[currentTab]?.current?.scrollIntoView();
  }, [currentTab, scrollTab]);

  useEffect(() => {
    const scrollCallback = (e) => {
      const res = tabs.map(({ type }) => ({
        pos: Math.abs(
          categoriesRefs[type].current.offsetTop - ref.current.scrollTop
        ),
        type,
      }));
      const tab = res.reduce((a, b) => (a.pos > b.pos ? b : a));

      setCurrentTab(tab.type);
    };

    ref.current.addEventListener("scroll", scrollCallback);

    return () => {
      window.removeEventListener("scroll", scrollCallback);
    };
  }, []);

  function onTabClick(currentTab) {
    setCurrentTab(currentTab);
  }

  function onProductClick(ingredient) {
    if (ingredient) {
      dispatch(OPEN_DETAILS(ingredient._id));
    } else {
      dispatch(CLOSE_DETAILS());
    }
  }

  return (
    <div className={styles.wrapper}>
      <Tabs currentTab={currentTab} onChange={onTabClick} />

      <div className={styles.categoriesList} ref={ref}>
        {groupProducts.map(({ type, title, ingredients }) => (
          <React.Fragment key={type}>
            <h2 className={styles.title} ref={categoriesRefs[type]}>
              {title}
            </h2>
            <div className={styles.productList}>
              {ingredients.map((ingredient) => (
                <React.Fragment key={ingredient._id}>
                  <ProductItem
                    count={countsMap.get(ingredient._id)}
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

const ProductItem = React.memo((props) => {
  const [_, drag] = useDrag({
    type: props.ingredient.type === "bun" ? "bun" : "ingredient",
    item: props.ingredient,
  });

  return (
    <section className={styles.productItem} onClick={props.onClick} ref={drag}>
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

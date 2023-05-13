import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductItemType } from "../../utils/common-prop-types";
import styles from "./burger-ingredients.module.css";

const ingredientTypesMap = {
  main: "Начинки",
  bun: "Булки",
  sauce: "Соусы",
};
const tabs = ["bun", "sauce", "main"].map((type) => ({
  type,
  title: ingredientTypesMap[type],
}));

const ingredientsDataSelector = (state) => ({
  ingredients: state.ingredients.data,
  countsMap: state.cart.ingredients.reduce((map, { id }) => {
    map.set(id, (map.get(id) || 0) + 1);

    return map;
  }, new Map(state.cart.bun ? [[state.cart.bun, 2]] : [])),
});

export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState("bun");
  const [groupProducts, setGroupProducts] = useState([]);
  const [thresholds, setThreshholds] = useState({});
  const { ingredients, countsMap } = useSelector(ingredientsDataSelector);
  const scrollContainerRef = useRef();
  const navigate = useNavigate();
  let location = useLocation();

  const categoriesRefs = {
    main: useRef(),
    bun: useRef(),
    sauce: useRef(),
  };

  useEffect(() => {
    setGroupProducts(getProductsList(ingredients));
  }, [ingredients]);

  useEffect(() => {
    const keys = Object.keys(thresholds);
    const closestTab =
      keys.length &&
      keys.reduce((max, key) =>
        thresholds[key] > thresholds[max] ? key : max
      );

    if (closestTab) {
      setCurrentTab(closestTab);
    }
  }, [thresholds]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setThreshholds((state) => ({
            ...state,
            [entry.target.dataset?.type]: entry.isIntersecting
              ? entry.intersectionRatio
              : 0,
          }));
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: Array.from({ length: 10, value: null }).map(
          (_, i) => (i + 1) / 10
        ),
      }
    );

    groupProducts.forEach((group) => {
      if (categoriesRefs[group.type].current) {
        observer.observe(categoriesRefs[group.type].current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [groupProducts]);

  function onTabClick(currentTab) {
    setCurrentTab(currentTab);
    categoriesRefs[currentTab]?.current?.scrollIntoView();
  }

  function onProductClick(ingredient) {
    navigate(`/ingredient/${ingredient._id}`, {
      state: { backgroundLocation: location },
    });
  }

  return (
    <div className={styles.wrapper}>
      <Tabs currentTab={currentTab} onChange={onTabClick} />

      <div className={styles.categoriesList} ref={scrollContainerRef}>
        {groupProducts.map(({ type, title, ingredients }) => (
          <div key={type} ref={categoriesRefs[type]} data-type={type}>
            <h2 className={styles.title}>{title}</h2>
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
          </div>
        ))}
      </div>
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

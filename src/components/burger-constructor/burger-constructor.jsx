import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import IngredientsContext from "../../contexts/ingredients-context";
import Order from "../order/order";
import styles from "./burger-constructor.module.css";
import { ProductItemType } from "../../utils/common-prop-types";

const DEFAULT_BUN_ITEM = "60d3b41abdacab0026a733c7";
const DEFAULT_ORDER_ITEMS = [
  "60d3b41abdacab0026a733c8",
  "60d3b41abdacab0026a733d0",
];

export default function BurgerConstructor() {
  const [bunIngredient, setBunIngredient] = useState(DEFAULT_BUN_ITEM);
  const [orderIngredients, setOrderIngredients] = useState(DEFAULT_ORDER_ITEMS);
  const ingredients = useContext(IngredientsContext);
  const [ingredientsMap, setIngredientsMap] = useState(new Map());

  useEffect(() => {
    setIngredientsMap(
      new Map(ingredients.map((ingredient) => [ingredient._id, ingredient]))
    );
  }, [ingredients]);

  const FirstBunItem = () => (
    <BunItem first={true} ingredient={ingredientsMap.get(bunIngredient)} />
  );
  const LastBunItem = () => (
    <BunItem first={false} ingredient={ingredientsMap.get(bunIngredient)} />
  );

  const ScrollItems = () => (
    <div className={styles.scrollItems}>
      {orderIngredients.map((id) => {
        const ingredient = ingredientsMap.get(id);

        return (
          ingredient && (
            <React.Fragment key={id}>
              <ProductItem ingredient={ingredient} />
            </React.Fragment>
          )
        );
      })}
    </div>
  );

  return (
    <div className={styles.items}>
      <FirstBunItem />
      <ScrollItems />
      <LastBunItem />
      <Order
        bunIngredient={bunIngredient}
        orderIngredients={orderIngredients}
      />
    </div>
  );
}

function ProductItem(props) {
  return (
    <div className={styles.item}>
      <div className={styles.itemDrag}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={props.ingredient.name}
        thumbnail={props.ingredient.image_mobile}
        price={props.ingredient.price}
      />
    </div>
  );
}
ProductItem.propTypes = {
  ingredient: ProductItemType.isRequired,
};

function BunItem(props) {
  const text = `${props.ingredient?.name} (${props.first ? "верх" : "низ"})`;

  return props.ingredient ? (
    <div className={styles.bunItem}>
      <ConstructorElement
        text={text}
        thumbnail={props.ingredient.image_mobile}
        price={props.ingredient.price}
        isLocked={true}
        type={props.first ? "top" : "bottom"}
      />
    </div>
  ) : null;
}
BunItem.propTypes = {
  first: PropTypes.bool.isRequired,
  ingredient: ProductItemType,
};

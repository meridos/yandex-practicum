import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  APPEND_BUN_CART,
  APPEND_INGREDIENT_CART,
  REMOVE_CART,
  SORT_CART,
} from "../../services/actions/cart";
import { ProductItemType } from "../../utils/common-prop-types";
import Order from "../order/order";
import styles from "./burger-constructor.module.css";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { ingredients, bunIngredient, orderIngredients } = useSelector(
    (state) => ({
      ingredients: state.ingredients.data,
      bunIngredient: state.cart.bun,
      orderIngredients: state.cart.ingredients,
    })
  );
  const [ingredientsMap, setIngredientsMap] = useState(new Map());

  useEffect(() => {
    setIngredientsMap(
      new Map(ingredients.map((ingredient) => [ingredient._id, ingredient]))
    );
  }, [ingredients]);

  const onDropBun = (item) => {
    dispatch(APPEND_BUN_CART(item._id));
  };
  const onDropIngredient = (item) => {
    dispatch(APPEND_INGREDIENT_CART(item._id));
  };

  const FirstBunItem = () => (
    <BunItem
      first={true}
      ingredient={ingredientsMap.get(bunIngredient)}
      onDrop={onDropBun}
    />
  );
  const LastBunItem = () => (
    <BunItem
      first={false}
      ingredient={ingredientsMap.get(bunIngredient)}
      onDrop={onDropBun}
    />
  );

  const onDeleteItem = (item) => {
    dispatch(REMOVE_CART(item));
  };
  const onSortItem = (prev, item) => {
    dispatch(SORT_CART({ prev, new: item._id }));
  };

  const ScrollItems = () => (
    <DropTarget accept="ingredient" onDrop={onDropIngredient}>
      <div className={styles.scrollItems}>
        {orderIngredients.length ? (
          orderIngredients.map((id, i) => {
            const ingredient = ingredientsMap.get(id);

            return (
              <React.Fragment key={id + i}>
                <ProductItem
                  ingredient={ingredient}
                  onDelete={() => onDeleteItem(id)}
                  onSortItem={(item) => onSortItem(id, item)}
                />
              </React.Fragment>
            );
          })
        ) : (
          <div className={styles.item}>
            <div className={`${styles.emptyElement}`}>
              <span className={styles.emptyElementText}>
                Перенесите сюда булку
              </span>
            </div>
          </div>
        )}
      </div>
    </DropTarget>
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
  const [_, drag] = useDrag({
    type: "order",
    item: props.ingredient,
  });

  return (
    <DropTarget onDrop={props.onSortItem} accept="order">
      <div ref={drag} className={styles.item}>
        <div className={styles.itemDrag}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={props.ingredient.name}
          thumbnail={props.ingredient.image_mobile}
          price={props.ingredient.price}
          handleClose={props.onDelete}
        />
      </div>
    </DropTarget>
  );
}
ProductItem.propTypes = {
  ingredient: ProductItemType.isRequired,
};

function BunItem(props) {
  const text = `${props.ingredient?.name} (${props.first ? "верх" : "низ"})`;

  return (
    <DropTarget onDrop={props.onDrop} accept="bun">
      {props.ingredient ? (
        <div className={styles.bunItem}>
          <ConstructorElement
            text={text}
            thumbnail={props.ingredient.image_mobile}
            price={props.ingredient.price}
            isLocked={true}
            type={props.first ? "top" : "bottom"}
          />
        </div>
      ) : (
        <div
          className={`${styles.bunItem} ${styles.bunEmptyElement} ${
            props.first
              ? "constructor-element_pos_top"
              : "constructor-element_pos_bottom"
          }`}
        >
          <span className={styles.emptyElementText}>Перенесите сюда булку</span>
        </div>
      )}
    </DropTarget>
  );
}
BunItem.propTypes = {
  first: PropTypes.bool.isRequired,
  ingredient: ProductItemType,
};

function DropTarget({ children, onDrop, accept }) {
  const [{ isHover }, dropTarget] = useDrop({
    accept,
    drop(item) {
      onDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return <div ref={dropTarget}>{children}</div>;
}

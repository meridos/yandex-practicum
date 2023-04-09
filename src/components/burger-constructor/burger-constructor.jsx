import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ProductItemType, createOrder } from "../../utils/data";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

export default function BurgerConstructor(props) {
  const [bunIngredient, setBunIngredient] = useState(null);
  const [orderIngredients, setOrderIngredients] = useState([]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [order, setOrder] = useState();
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    setBunIngredient(
      props.ingredients?.find(({ type }) => type === "bun") || null
    );
    setOrderIngredients(
      props.ingredients?.filter(({ type }) => type !== "bun")
    );
  }, [props.ingredients]);

  const onCompleteClick = useCallback(() => {
    setOrderLoading(true);
  });

  const onCompleteModalClose = useCallback(() => {
    setOrderOpen(false);
  });

  useEffect(() => {
    if (orderLoading) {
      createOrder()
        .then((order) => {
          setOrder(order);
          setOrderOpen(true);
        })
        .finally(() => {
          setOrderLoading(false);
        });
    }
  }, [orderLoading]);

  return (
    <div className={styles.items}>
      <BunItem first={true} ingredient={bunIngredient} />
      <div className={styles.scrollItems}>
        {orderIngredients.map((item) => (
          <React.Fragment key={item._id}>
            <ProductItem ingredient={item} />
          </React.Fragment>
        ))}
      </div>
      <BunItem first={false} ingredient={bunIngredient} />
      <div className={styles.total}>
        <p className="text text_type_digits-medium mr-2">610</p>
        <div className={styles.totalIcon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={onCompleteClick}
        >
          Оформить заказ
        </Button>
      </div>
      {orderOpen && (
        <Modal onClose={onCompleteModalClose}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </div>
  );
}
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ProductItemType).isRequired,
};

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

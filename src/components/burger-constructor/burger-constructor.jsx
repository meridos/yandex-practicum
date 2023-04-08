import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ProductItemType } from "../app/utils/data";
export default class BurgerConstructor extends React.Component {
  state = {
    bunIngredient:
      this.props.ingredients?.find(({ type }) => type === "bun") || null,
    orderIngredients: this.props.ingredients?.filter(
      ({ type }) => type !== "bun"
    ),
  };

  render() {
    return (
      <>
        <div className={styles.items}>
          <BunItem first={true} ingredient={this.state.bunIngredient} />
          <div className={styles.scrollItems}>
            {this.state.orderIngredients.map((item) => (
              <React.Fragment key={item._id}>
                <ProductItem {...item} />
              </React.Fragment>
            ))}
          </div>
          <BunItem first={false} ingredient={this.state.bunIngredient} />
        </div>
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
          >
            Оформить заказ
          </Button>
        </div>
      </>
    );
  }
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
        text={props.name}
        thumbnail={props.image_mobile}
        price={props.price}
      />
    </div>
  );
}
ProductItem.propTypes = {
  ...ProductItemType,
};

function BunItem(props) {
  return props.ingredient ? (
    <div className={styles.bunItem}>
      <ConstructorElement
        text={props.ingredient.name}
        thumbnail={props.ingredient.image_mobile}
        price={props.ingredient.price}
        isLocked={true}
        type={props.first ? "top" : "bottom"}
      />
    </div>
  ) : null;
}
ProductItem.propTypes = {
  first: PropTypes.bool.isRequired,
  ingredient: ProductItemType,
};

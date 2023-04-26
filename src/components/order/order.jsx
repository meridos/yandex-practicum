import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useCallback, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_ORDER, createOrder } from "../../services/actions/order";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./order.module.css";

const initialState = { totalPrice: 0 };

function totalPriceReducer(state, action) {
  switch (action.type) {
    case "reset":
      return { totalPrice: 0 };
    case "bun":
      return { totalPrice: state.totalPrice + action.payload.price * 2 };
    case "ingredient":
      return { totalPrice: state.totalPrice + action.payload.price };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

export default function OrderTotal(props) {
  const ingredients = useSelector((state) => state.ingredients.data);
  const [totalPriceState, totalPriceDispatch] = useReducer(
    totalPriceReducer,
    initialState
  );
  const dispatch = useDispatch();
  const { order, orderLoading, error, orderOpen } = useSelector((state) => ({
    order: state.order.data?.number,
    orderLoading: state.order.loading,
    error: state.order.error,
    orderOpen: state.order.open,
  }));

  useEffect(() => {
    totalPriceDispatch({ type: "reset" });

    ingredients.forEach((ingredient) => {
      if (props.bunItem === ingredient._id) {
        totalPriceDispatch({ type: "bun", payload: ingredient });
      }

      const orderIngredient = props.orderIngredients.find(
        ({ id }) => id === ingredient._id
      );

      if (orderIngredient) {
        totalPriceDispatch({ type: "ingredient", payload: ingredient });
      }
    });
  }, [ingredients, props.bunItem, props.orderIngredients]);

  const onCompleteClick = useCallback(() => {
    dispatch(
      createOrder(
        [props.bunItem, ...props.orderIngredients.map(({ id }) => id)].filter(
          Boolean
        )
      )
    );
  });
  const onCompleteModalClose = useCallback(() => {
    dispatch(CLOSE_ORDER());
  });

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.total}>
        <p className="text text_type_digits-medium mr-2">
          {totalPriceState.totalPrice}
        </p>
        <div className={styles.totalIcon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          disabled={orderLoading}
          onClick={onCompleteClick}
        >
          Оформить заказ
        </Button>
        {orderOpen && (
          <Modal onClose={onCompleteModalClose}>
            <OrderDetails order={order} />
          </Modal>
        )}
      </div>
    </>
  );
}
OrderTotal.propTypes = {
  bunItem: PropTypes.string,
  orderIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
    })
  ).isRequired,
};

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  FC,
  Reducer,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../const/routes";
import { IIngredient, IState, TDispatch } from "../../models";
import { CLOSE_ORDER, createOrder } from "../../services/actions/order";
import { getUser } from "../../services/actions/profile";
import { Modal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./order.module.css";

interface ITotalPriceState {
  totalPrice: number;
}

const initialState: ITotalPriceState = { totalPrice: 0 };

type TTotalPriceAction =
  | {
      type: "reset";
    }
  | {
      type: "bun" | "ingredient";
      payload: IIngredient;
    };

function totalPriceReducer(state: ITotalPriceState, action: TTotalPriceAction) {
  switch (action.type) {
    case "reset":
      return { totalPrice: 0 };
    case "bun":
      return { totalPrice: state.totalPrice + action.payload.price * 2 };
    case "ingredient":
      return { totalPrice: state.totalPrice + action.payload.price };
    default:
      throw new Error(`Wrong type of action`);
  }
}

interface IOrderTotalProps {
  orderIngredients: Array<{
    id: string;
    uuid: string;
  }>;
  bunItem?: string;
}

const orderDataSelector = (state: IState) => ({
  ingredients: state.ingredients.data,
  order: state.order?.data?.number,
  orderLoading: state.order.loading,
  error: state.order.error,
  orderOpen: state.order.open,
});

const OrderTotal: FC<IOrderTotalProps> = (props) => {
  const { ingredients, order, orderLoading, error, orderOpen } =
    useSelector(orderDataSelector);
  const ingredientsMap = useMemo(
    () =>
      new Map(ingredients.map((ingredient) => [ingredient._id, ingredient])),
    [ingredients]
  );
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<TDispatch>();

  const [totalPriceState, totalPriceDispatch] = useReducer<
    Reducer<ITotalPriceState, TTotalPriceAction>
  >(totalPriceReducer, initialState);

  useEffect(() => {
    totalPriceDispatch({ type: "reset" });

    if (props.bunItem && ingredientsMap.get(props.bunItem)) {
      totalPriceDispatch({
        type: "bun",
        payload: ingredientsMap.get(props.bunItem)!,
      });
    }

    props.orderIngredients.forEach(({ id }) => {
      if (!ingredientsMap.get(id)) return;

      totalPriceDispatch({
        type: "ingredient",
        payload: ingredientsMap.get(id)!,
      });
    });

    setValid(Boolean(props.bunItem));
  }, [ingredientsMap, props.bunItem, props.orderIngredients]);

  const onCompleteClick = useCallback(() => {
    dispatch(getUser())
      .unwrap()
      .then((user) => {
        if (!user) throw new Error();
        dispatch(
          createOrder(
            [
              props.bunItem,
              ...props.orderIngredients.map(({ id }) => id),
            ].filter(Boolean) as string[]
          )
        );
      })
      .catch(() => {
        navigate(LOGIN_ROUTE);
      });
  }, [props.bunItem, props.orderIngredients, dispatch, navigate]);
  const onCompleteModalClose = useCallback(() => {
    dispatch(CLOSE_ORDER());
  }, [dispatch]);

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
          disabled={orderLoading || !valid}
          onClick={onCompleteClick}
        >
          Оформить заказ
        </Button>
        {orderOpen && order && (
          <Modal onClose={onCompleteModalClose}>
            <OrderDetails order={order} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default memo(OrderTotal);

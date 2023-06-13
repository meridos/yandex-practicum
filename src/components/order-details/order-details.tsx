import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useMemo, useState } from "react";
import { IIngredient, IState, TDispatch, TOrderStatus } from "../../models";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import styles from "./order-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import {
  ORDERS_CONNECTION_CLOSED,
  getAllOrders,
} from "../../services/actions/orders";

export interface IOrderDetailsIngredient extends IIngredient {
  count: number;
}

export interface IOrderDetailsProps {
  id?: string;
}

function getStatusText(status: TOrderStatus): string {
  switch (status) {
    case TOrderStatus.Done:
      return "Выполнен";
    case TOrderStatus.Pending:
      return "В процессе";
    case TOrderStatus.Created:
      return "Создан";
    case TOrderStatus.Cancelled:
      return "Отменён";
    default:
      return "";
  }
}

export const OrderDetails: FC<IOrderDetailsProps> = (props) => {
  const { order, allIngredients, ordersLoaded } = useSelector(
    (state: IState) => ({
      order: state.orders.orders.find(({ _id }) => _id === props.id),
      allIngredients: state.ingredients.data,
      ordersLoaded: state.orders.wsConnected || state.orders.orders.length > 0,
    })
  );
  const [orderIngredients, setOrderIngredients] = useState<
    IOrderDetailsIngredient[]
  >([]);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch<TDispatch>();

  useEffect(() => {
    const ingredientsMap = allIngredients.reduce((res, ingredient) => {
      res.set(ingredient._id, ingredient);
      return res;
    }, new Map<string, IIngredient>());
    const countMap =
      order?.ingredients.reduce((res, id) => {
        res[id] = (res[id] || 0) + 1;

        return res;
      }, {} as Record<string, number>) || {};

    const newOrderIngredients =
      Object.keys(countMap)
        .map((id) => ingredientsMap.get(id)!)
        .filter(Boolean)
        .map((ingredient) => ({
          ...ingredient,
          count: countMap[ingredient._id] || 0,
        })) || [];
    setOrderIngredients(newOrderIngredients);
    setPrice(
      newOrderIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price * ingredient.count,
        0
      )
    );
  }, [allIngredients, order]);

  useEffect(() => {
    if (!ordersLoaded) {
      dispatch(getAllOrders());

      return () => {
        dispatch({ type: ORDERS_CONNECTION_CLOSED });
      };
    }
  }, []);

  return order ? (
    <div className={styles.container}>
      <p
        className={`text text_type_digits-default mb-10 ${styles.orderNumber}`}
      >
        #{order.number}
      </p>
      <p className="text text_type_main-medium mb-3">{order.name}</p>
      <p
        className={`text text_type_main-default mb-15 ${
          order.status === TOrderStatus.Done ? styles.completed : ""
        }`}
      >
        {getStatusText(order.status)}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={styles.ingredients}>
        {orderIngredients.map((ingredient) => (
          <div className={styles.ingredient} key={ingredient._id}>
            <IngredientIcon image={ingredient.image_mobile} />
            <p
              className={`text text_type_main-default ${styles.ingredientTitle}`}
            >
              {ingredient.name}
            </p>
            <Price {...ingredient} />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.updatedAt)} />
        </p>
        <Price price={price} />
      </div>
    </div>
  ) : (
    <p className="text text_type_main-medium">Заказ не найден</p>
  );
};

interface IPriceProps {
  price: number;
  count?: number;
}

const Price: FC<IPriceProps> = (props) => {
  const count = props.count ? `${props.count} x ` : "";
  const summary = `${count}${props.price}`;

  return (
    <p className={`text text_type_digits-default ${styles.price}`}>
      <span className="mr-2">{summary}</span>
      <CurrencyIcon type="primary" />
    </p>
  );
};

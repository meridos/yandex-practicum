import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { IIngredient, IState, TOrderStatus } from "../../models";
import {
  ORDERS_CONNECTION_CLOSED,
  getAllOrders,
  getProfileOrders,
} from "../../services/actions/orders";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import styles from "./order-details.module.css";

export interface IOrderDetailsIngredient extends IIngredient {
  count: number;
}

export interface IOrderDetailsProps {
  fromAllOrders: boolean;
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
  const { order, allIngredients, ordersLoaded, error } = useAppSelector(
    (state: IState) => ({
      order: state.orders.orders?.find(({ _id }) => _id === props.id),
      allIngredients: state.ingredients.data,
      ordersLoaded: !!state.orders.orders,
      error: state.orders.error,
    })
  );
  const [orderIngredients, setOrderIngredients] = useState<
    IOrderDetailsIngredient[]
  >([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

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
      dispatch(props.fromAllOrders ? getAllOrders() : getProfileOrders());
      setLoading(true);

      return () => {
        dispatch({ type: ORDERS_CONNECTION_CLOSED });
      };
    }
  }, []);

  useEffect(() => {
    if (error || ordersLoaded) {
      setLoading(false);
    }
  }, [error, ordersLoaded]);

  if (loading) {
    return <p className="text text_type_main-medium">Загрузка...</p>;
  }

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

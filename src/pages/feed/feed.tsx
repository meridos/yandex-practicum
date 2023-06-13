import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderListItem } from "../../components/order-list-item/order-list-item";
import {
  OrderNumbers,
  OrderNumbersMode,
} from "../../components/order-numbers/order-numbers";
import { OrderTotal } from "../../components/order-total/order-total";
import { PROFILE_ORDERS_ROUTE } from "../../const/routes";
import { IIngredient, IState, TDispatch, TOrderStatus } from "../../models";
import { ERROR } from "../../services/actions/error";
import {
  ORDERS_CONNECTION_CLOSED,
  getAllOrders,
} from "../../services/actions/orders";
import styles from "./feed.module.css";

export const FeedPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<TDispatch>();
  const { ingredientsMap, orders, error, totalCount, totalTodayCount } =
    useSelector((state: IState) => ({
      orders: state.orders.orders,
      error: state.orders.error,
      ingredientsMap: state.ingredients.data.reduce((map, ingredient) => {
        map.set(ingredient._id, ingredient);
        return map;
      }, new Map<string, IIngredient>()),
      totalCount: state.orders.total,
      totalTodayCount: state.orders.totalToday,
    }));
  const [columns, setColumns] = useState<
    { type: OrderNumbersMode; ids: number[] }[]
  >([]);

  const onOrderClick = (id: string) => {
    navigate(`${PROFILE_ORDERS_ROUTE}/${id}`, {
      state: { backgroundLocation: location },
    });
  };

  useEffect(() => {
    dispatch(getAllOrders());

    return () => {
      dispatch({ type: ORDERS_CONNECTION_CLOSED });
    };
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(ERROR("Ошибка получения заказов"));
    }
  }, [error]);

  useEffect(() => {
    const completed: number[] = [];
    const pending: number[] = [];

    orders.forEach((order) => {
      if (order.status === TOrderStatus.Done) {
        completed.push(order.number);
      } else {
        pending.push(order.number);
      }
    });

    const split = (arr: number[], size: number) =>
      arr.reduce((acc, _, i) => {
        if (i % size === 0) {
          acc.push(arr.slice(i, i + size));
        }
        return acc;
      }, [] as number[][]);

    setColumns(
      split(completed, 10)
        .map((ids) => ({ type: OrderNumbersMode.Completed, ids }))
        .concat(
          split(pending, 10).map((ids) => ({
            type: OrderNumbersMode.Pending,
            ids,
          }))
        )
    );
  }, [orders]);

  return (
    <>
      <div className={styles.container}>
        <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
        <div className={styles.row}>
          <div className={styles.feed}>
            {orders.map((order) => (
              <OrderListItem
                className={styles.order}
                key={order._id}
                order={order}
                images={order.ingredients
                  .map((id) => ingredientsMap.get(id)?.image_mobile!)
                  .filter(Boolean)}
                price={order.ingredients.reduce(
                  (sum, id) => sum + (ingredientsMap.get(id)?.price || 0),
                  0
                )}
                onClick={() => onOrderClick(order._id)}
              />
            ))}
          </div>
          <div className={styles.summary}>
            <div className={styles.orderNumbers}>
              {columns.map((column) => (
                <OrderNumbers
                  orderIds={column.ids.map(String)}
                  title={
                    column.type === OrderNumbersMode.Completed
                      ? "Готовы:"
                      : "В работе:"
                  }
                  mode={column.type}
                ></OrderNumbers>
              ))}
            </div>
            <OrderTotal title="Выполнено за все время:" total={totalCount} />
            <OrderTotal title="Выполнено за сегодня:" total={totalTodayCount} />
          </div>
        </div>
      </div>
    </>
  );
};

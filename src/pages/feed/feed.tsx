import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderList } from "../../components/order-list/order-list";
import {
  OrderNumbers,
  OrderNumbersMode,
} from "../../components/order-numbers/order-numbers";
import { OrderTotal } from "../../components/order-total/order-total";
import { PROFILE_ORDERS_ROUTE } from "../../const/routes";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { TOrderStatus } from "../../models";
import { ERROR } from "../../services/actions/error";
import {
  ORDERS_CONNECTION_CLOSED,
  getAllOrders,
} from "../../services/actions/orders";
import styles from "./feed.module.css";

export const FeedPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orders, error, totalCount, totalTodayCount } = useAppSelector(
    (state) => ({
      orders: state.orders.orders,
      error: state.orders.error,
      totalCount: state.orders.total,
      totalTodayCount: state.orders.totalToday,
    })
  );
  const [columns, setColumns] = useState<
    { type: OrderNumbersMode; ids: number[]; key: number }[]
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
        .map((ids) => ({ type: OrderNumbersMode.Completed, ids, key: ids[0] }))
        .concat(
          split(pending, 10).map((ids) => ({
            type: OrderNumbersMode.Pending,
            ids,
            key: ids[0],
          }))
        )
    );
  }, [orders]);

  return (
    <>
      <div className={styles.container}>
        <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
        <div className={styles.row}>
          <div className={styles.column}>
            <OrderList onClick={onOrderClick} />
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
                  key={column.key}
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

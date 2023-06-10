import { FC } from "react";
import styles from "./feed.module.css";
import { OrderListItem } from "../../components/order-list-item/order-list-item";
import {
  OrderNumbers,
  OrderNumbersMode,
} from "../../components/order-numbers/order-numbers";
import { OrderTotal } from "../../components/order-total/order-total";
import { PROFILE_ORDERS_ROUTE } from "../../const/routes";
import { useLocation, useNavigate } from "react-router-dom";

export const FeedPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orders = new Array(10).fill({
    date: "2022-03-05T01:23:45",
    id: "0123",
    ingredients: [
      {
        image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      },
      {
        image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      },
      {
        image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      },
      {
        image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      },
      {
        image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      },
      {
        image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      },
      {
        image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      },
      {
        image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      },
    ] as any,
    price: 456,
    title: "some",
  });

  const onOrderClick = (id: string) => {
    navigate(`${PROFILE_ORDERS_ROUTE}/${id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
        <div className={styles.row}>
          <div className={styles.feed}>
            {orders.map((order) => (
              <OrderListItem
                className={styles.order}
                key={order.id}
                date={order.date}
                id={order.id}
                ingredients={order.ingredients}
                price={order.price}
                title={order.title}
                onClick={() => onOrderClick(order.id)}
              />
            ))}
          </div>
          <div className={styles.summary}>
            <div className={styles.orderNumbers}>
              <OrderNumbers
                orderIds={["034533", "034533", "034533", "034533", "034533"]}
                title="Готовы:"
                mode={OrderNumbersMode.Completed}
              ></OrderNumbers>
              <OrderNumbers
                orderIds={["034538"]}
                title="В работе:"
              ></OrderNumbers>
            </div>
            <OrderTotal title="Выполнено за все время:" total={28752} />
            <OrderTotal title="Выполнено за сегодня:" total={138} />
          </div>
        </div>
      </div>
    </>
  );
};

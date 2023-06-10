import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderListItem } from "../../../components/order-list-item/order-list-item";
import { PROFILE_ORDERS_ROUTE } from "../../../const/routes";
import styles from "./orders.module.css";

export const ProfileOrdersPage: FC = () => {
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
    <div className={styles.container}>
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
  );
};

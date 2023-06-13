import { FC } from "react";
import { OrderDetails } from "../../components/order-details/order-details";
import { TOrderStatus } from "../../models";
import styles from "./order-details.module.css";

export const OrderDetailsPage: FC = () => {
  return (
    <div className={styles.container}>
      <OrderDetails
        date="2023-06-08T13:50:02"
        id="034533"
        ingredients={
          [
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
          ] as any
        }
        price={510}
        status={TOrderStatus.Done}
        title="Black Hole"
      />
    </div>
  );
};

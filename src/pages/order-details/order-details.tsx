import { FC } from "react";
import { OrderDetails as OrderDetailsComponent } from "../../components/order-details/order-details";
import { OrderStatus } from "../../models";
import styles from "./order-details.module.css";

export const OrderDetails: FC = () => {
  return (
    <div className={styles.container}>
      <OrderDetailsComponent
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
        status={OrderStatus.Completed}
        title="Black Hole"
      />
    </div>
  );
};

import { FC } from "react";
import { useParams } from "react-router-dom";
import { OrderDetails } from "../../components/order-details/order-details";
import styles from "./order-details.module.css";

export const OrderDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.container}>
      <OrderDetails id={id} />
    </div>
  );
};

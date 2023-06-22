import { FC } from "react";
import styles from "./order-numbers.module.css";

export enum OrderNumbersMode {
  Pending,
  Completed,
}

interface IOrderNumbersProps {
  orderIds: string[];
  title: string;
  mode?: OrderNumbersMode;
}

export const OrderNumbers: FC<IOrderNumbersProps> = (props) => {
  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium mb-6">{props.title}</p>
      {props.orderIds.map((orderId, index) => (
        <p
          className={`text text_type_digits-default ${
            props.mode === OrderNumbersMode.Completed ? styles.completed : ""
          }${index === props.orderIds.length - 1 ? "" : " mb-2"}`}
          key={orderId}
        >
          {orderId}
        </p>
      ))}
    </div>
  );
};

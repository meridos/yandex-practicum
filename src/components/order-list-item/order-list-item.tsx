import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { IOrder, TOrderStatus } from "../../models";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import styles from "./order-list-item.module.css";

interface IOrderListItemProps {
  order: IOrder;
  images: string[];
  price: number;
  onClick?: () => void;
  className?: string;
}

export const OrderListItem: FC<IOrderListItemProps> = (props) => {
  const counter =
    props.order.ingredients.length > 6
      ? {
          icon: props.images[5],
          count: props.order.ingredients.length - 6,
        }
      : null;
  const icons = props.images.slice(0, counter ? 5 : 6);

  return (
    <div
      className={`${styles.container} ${props.className || ""}`}
      onClick={props.onClick}
    >
      <div className={styles.header}>
        <p className="text text_type_digits-default mb-6">
          #{props.order.number}
        </p>
        <p className="text text_type_main-default text_color_inactive mb-6">
          <FormattedDate date={new Date(props.order.updatedAt)} />
        </p>
      </div>
      <p className="text text_type_main-medium">{props.order.name}</p>
      {props.order.status ? (
        <p
          className={`text text_type_main-default mt-2 ${
            props.order.status === TOrderStatus.Done ? styles.done : ""
          }`}
        >
          {getStatusText(props.order.status)}
        </p>
      ) : null}
      <div className={styles.content}>
        <div className={styles.icons}>
          {icons.map((icon) => (
            <IngredientIcon className={styles.icon} image={icon} />
          ))}
          {counter && (
            <IngredientIcon
              className={styles.icon}
              image={counter.icon}
              count={counter.count}
            />
          )}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

function getStatusText(status: TOrderStatus): string {
  switch (status) {
    case TOrderStatus.Done:
      return "Выполнен";
    case TOrderStatus.Pending:
      return "Готовится";
    case TOrderStatus.Created:
      return "Создан";
    case TOrderStatus.Cancelled:
      return "Отменён";
    default:
      return "";
  }
}

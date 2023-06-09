import { FC } from "react";
import styles from "./order-list-item.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient, OrderStatus } from "../../models";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";

interface IOrderListItemProps {
  ingredients: IIngredient[];
  price: number;
  date: string;
  title: string;
  id: string;
  status?: OrderStatus;
}

export const OrderListItem: FC<IOrderListItemProps> = (props) => {
  const counter =
    props.ingredients.length > 6
      ? {
          icon: props.ingredients[5].image_mobile,
          count: props.ingredients.length - 6,
        }
      : null;
  const icons = props.ingredients
    .map((ingredient) => ingredient.image_mobile)
    .slice(0, counter ? 5 : 6);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className="text text_type_digits-default mb-6">#034535</p>
        <p className="text text_type_main-default text_color_inactive mb-6">
          <FormattedDate date={new Date()} />
        </p>
      </div>
      <p className="text text_type_main-medium">
        Death Star Starship Main бургер
      </p>
      {props.status ? (
        <p className="text text_type_main-default mt-2">
          {getStatusText(props.status)}
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
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

function getStatusText(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Completed:
      return "Выполнен";
    case OrderStatus.Pending:
      return "Готовится";
    case OrderStatus.Created:
      return "Создан";
    default:
      return "";
  }
}

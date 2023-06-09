import { FC } from "react";
import { IIngredient, OrderStatus } from "../../models";
import styles from "./order-details.module.css";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

export interface IOrderDetailsIngredient extends IIngredient {
  count: number;
}

export interface IOrderDetailsProps {
  ingredients: IOrderDetailsIngredient[];
  price: number;
  date: string;
  title: string;
  id: string;
  status: OrderStatus;
}

function getStatusText(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Completed:
      return "Выполнен";
    case OrderStatus.Pending:
      return "В процессе";
    case OrderStatus.Created:
      return "Создан";
    default:
      return "";
  }
}

export const OrderDetails: FC<IOrderDetailsProps> = (props) => {
  return (
    <div className={styles.container}>
      <p
        className={`text text_type_digits-default mb-10 ${styles.orderNumber}`}
      >
        #{props.id}
      </p>
      <p className="text text_type_main-medium mb-3">{props.title}</p>
      <p
        className={`text text_type_main-default mb-15 ${
          props.status === OrderStatus.Completed ? styles.completed : ""
        }`}
      >
        {getStatusText(props.status)}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={styles.ingredients}>
        {props.ingredients.map((ingredient) => (
          <div className={styles.ingredient}>
            <IngredientIcon image={ingredient.image_mobile} />
            <p
              className={`text text_type_main-default ${styles.ingredientTitle}`}
            >
              {ingredient.name}
            </p>
            <Price {...ingredient} />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(props.date)} />
        </p>
        <Price price={props.price} />
      </div>
    </div>
  );
};

interface IPriceProps {
  price: number;
  count?: number;
}

const Price: FC<IPriceProps> = (props) => {
  const count = props.count ? `${props.count} x ` : "";
  const summary = `${count}${props.price}`;

  return (
    <p className={`text text_type_digits-default ${styles.price}`}>
      <span className="mr-2">{summary}</span>
      <CurrencyIcon type="primary" />
    </p>
  );
};

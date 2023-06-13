import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { IIngredient, TOrderStatus } from "../../models";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import styles from "./order-details.module.css";

export interface IOrderDetailsIngredient extends IIngredient {
  count: number;
}

export interface IOrderDetailsProps {
  ingredients: IOrderDetailsIngredient[];
  price: number;
  date: string;
  title: string;
  id: string;
  status: TOrderStatus;
}

function getStatusText(status: TOrderStatus): string {
  switch (status) {
    case TOrderStatus.Done:
      return "Выполнен";
    case TOrderStatus.Pending:
      return "В процессе";
    case TOrderStatus.Created:
      return "Создан";
    case TOrderStatus.Cancelled:
      return "Отменён";
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
          props.status === TOrderStatus.Done ? styles.completed : ""
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

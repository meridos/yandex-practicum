import { FC } from "react";
import styles from "./order-list-item.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../models";

interface IOrderListItemProps {
  ingredients: IIngredient[];
  price: number;
  date: string;
  title: string;
  id: string;
}

export const OrderListItem: FC<IOrderListItemProps> = (props) => {
  const counter =
    props.ingredients.length > 6
      ? {
          icon: props.ingredients[5].image_mobile,
          text: `+${props.ingredients.length - 6}`,
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
      <p className="text text_type_main-medium mb-6">
        Death Star Starship Main бургер
      </p>
      <div className={styles.content}>
        <div className={styles.icons}>
          {icons.map((icon) => (
            <img className={styles.icon} src={icon} />
          ))}
          {counter && (
            <div className={styles.iconCounter}>
              <img src={counter.icon} />
              <span className={styles.counter}>{counter.text}</span>
            </div>
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

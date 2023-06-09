import { FC } from "react";
import styles from "./ingredient-icon.module.css";

export interface IIngredientIconProps {
  image: string;
  count?: number;
  className?: string;
}

export const IngredientIcon: FC<IIngredientIconProps> = (props) => {
  return (
    <div className={`${styles.container} ${props.className}`}>
      <img src={props.image} />
      {props.count ? (
        <span className={styles.counter}>+{props.count}</span>
      ) : null}
    </div>
  );
};

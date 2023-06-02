import { FC } from "react";
import { IIngredient } from "../../models/ingredient";
import styles from "./ingredient-details.module.css";

interface IIngredientDetailsProps {
  ingredient: IIngredient;
}

export const IngredientDetails: FC<IIngredientDetailsProps> = ({
  ingredient,
}) => {
  const detailsList: [string, number][] = [
    ["Калории,ккал", ingredient.calories],
    ["Белки, г", ingredient.proteins],
    ["Жиры, г", ingredient.fat],
    ["Углеводы, г", ingredient.carbohydrates],
  ];

  return (
    <div className={styles.content}>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h3 className="text text_type_main-medium mt-4 mb-8">
        {ingredient.name}
      </h3>
      <div className={styles.details}>
        {detailsList.map(([title, value]) => (
          <DetailItem key={title} title={title} value={value} />
        ))}
      </div>
    </div>
  );
};

interface IDetailItemProps {
  title: string;
  value: number;
}

const DetailItem: FC<IDetailItemProps> = (props) => {
  const value = String(props.value / 10).replace(".", ",");

  return (
    <div className={styles.detailItem}>
      <p className="text text_type_main-default text_color_inactive mb-2">
        {props.title}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </div>
  );
};

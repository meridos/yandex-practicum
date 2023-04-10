import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import { ProductItemType } from "../../utils/data";

export default function IngredientDetails(props) {
  const detailsList = [
    ["Калории,ккал", props.ingredient.calories],
    ["Белки, г", props.ingredient.proteins],
    ["Жиры, г", props.ingredient.fat],
    ["Углеводы, г", props.ingredient.carbohydrates],
  ];

  return (
    <div className={styles.content}>
      <img
        className={styles.image}
        src={props.ingredient.image_large}
        alt={props.ingredient.name}
      />
      <h3 className="text text_type_main-medium mt-4 mb-8">
        {props.ingredient.name}
      </h3>
      <div className={styles.details}>
        {detailsList.map(([title, value]) => (
          <DetailItem key={title} title={title} value={value} />
        ))}
      </div>
    </div>
  );
}
IngredientDetails.propTypes = {
  ingredient: ProductItemType.isRequired,
};

function DetailItem(props) {
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
}
DetailItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

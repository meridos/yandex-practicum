import React from "react";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import orderDoneImg from "../../images/order-done.png";

export default function OrderDetails(props) {
  return (
    <div className={styles.content}>
      <p className={styles.text}>{props.order}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={orderDoneImg} alt="Ваш заказ начали готовить" />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
OrderDetails.propTypes = {
  order: PropTypes.number.isRequired,
};

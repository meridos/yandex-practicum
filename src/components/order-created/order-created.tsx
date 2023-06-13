import orderDoneImg from "../../images/order-done.png";
import styles from "./order-created.module.css";

interface IOrderCreatedProps {
  order: number;
}

export default function OrderCreated(props: IOrderCreatedProps) {
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

import { FC } from "react";
import { IIngredient, IOrder, IState } from "../../models";
import { useSelector } from "react-redux";
import { OrderListItem } from "../order-list-item/order-list-item";
import styles from "./order-list.module.css";

interface IOrderListProps {
  onClick?: (id: string) => void;
}

export const OrderList: FC<IOrderListProps> = (props) => {
  const { ingredientsMap, orders, ordersError } = useSelector(
    (state: IState) => ({
      orders: state.orders.orders,
      ingredientsMap: state.ingredients.data.reduce((map, ingredient) => {
        map.set(ingredient._id, ingredient);
        return map;
      }, new Map<string, IIngredient>()),
      ordersError: state.orders.error,
    })
  );

  return (
    <div className={styles.container}>
      {ordersError ? <p className={styles.error}>{ordersError}</p> : null}
      {orders?.map((order) => (
        <OrderListItem
          className={props.onClick ? styles.clickable : ""}
          key={order._id}
          order={order}
          images={order.ingredients
            .map((id) => ingredientsMap.get(id)?.image_mobile!)
            .filter(Boolean)}
          price={order.ingredients.reduce(
            (sum, id) => sum + (ingredientsMap.get(id)?.price || 0),
            0
          )}
          onClick={props.onClick ? () => props.onClick!(order._id) : undefined}
        />
      ))}
    </div>
  );
};

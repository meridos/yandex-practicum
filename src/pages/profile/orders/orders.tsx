import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderList } from "../../../components/order-list/order-list";
import { PROFILE_ORDERS_ROUTE } from "../../../const/routes";
import { useAppDispatch } from "../../../hooks/store";
import {
  ORDERS_CONNECTION_CLOSED,
  getProfileOrders,
} from "../../../services/actions/orders";
import styles from "./orders.module.css";

export const ProfileOrdersPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const onOrderClick = (id: string) => {
    navigate(`${PROFILE_ORDERS_ROUTE}/${id}`, {
      state: { backgroundLocation: location },
    });
  };

  useEffect(() => {
    dispatch(getProfileOrders());

    return () => {
      dispatch({ type: ORDERS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <div className={styles.container}>
      <OrderList onClick={onOrderClick} />
    </div>
  );
};

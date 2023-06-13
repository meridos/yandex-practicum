import { FC, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/modal/modal";
import { OrderDetails } from "../../components/order-details/order-details";

export const OrderDetailsModal: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const onCloseModal = useCallback(() => {
    navigate(location.state?.backgroundLocation);
  }, [navigate, location]);

  return (
    <Modal header="Детали ингредиента" onClose={onCloseModal}>
      <OrderDetails id={id} />
    </Modal>
  );
};

import { FC, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../../components/modal/modal";
import { OrderDetails } from "../../components/order-details/order-details";
import { OrderStatus } from "../../models";

export const OrderDetailsModal: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onCloseModal = useCallback(() => {
    navigate(location.state?.backgroundLocation);
  }, [navigate, location]);

  return (
    <Modal header="Детали ингредиента" onClose={onCloseModal}>
      <OrderDetails
        date="2023-06-08T13:50:02"
        id="034533"
        ingredients={
          [
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
            {
              price: 20,
              count: 2,
              name: "some\nsome",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            },
          ] as any
        }
        price={510}
        status={OrderStatus.Completed}
        title="Black Hole"
      />
    </Modal>
  );
};

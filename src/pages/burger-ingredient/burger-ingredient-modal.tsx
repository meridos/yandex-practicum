import { FC, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { Modal } from "../../components/modal/modal";
import { useAppSelector } from "../../hooks/store";
import { IIngredient } from "../../models";

export const BurgerIngredientModal: FC = () => {
  const { productId } = useParams<{
    productId: string;
  }>();
  const ingredients = useAppSelector((state) => state.ingredients.data);
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<IIngredient>();

  const onCloseModal = useCallback(() => {
    navigate(location.state?.backgroundLocation);
  }, [navigate, location]);

  useEffect(() => {
    setProduct(ingredients.find(({ _id }) => _id === productId));
  }, [ingredients, productId]);

  return (
    <Modal header="Детали ингредиента" onClose={onCloseModal}>
      {product && <IngredientDetails ingredient={product} />}
    </Modal>
  );
};

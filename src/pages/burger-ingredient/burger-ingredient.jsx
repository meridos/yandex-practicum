import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";

export default function BurgerIngredientModal() {
  const { productId } = useParams();
  const ingredients = useSelector((state) => state.ingredients.data);
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState();

  const onCloseModal = useCallback(() => {
    navigate(location.state?.backgroundLocation);
  }, []);

  useEffect(() => {
    setProduct(ingredients.find(({ _id }) => _id == productId));
  }, [ingredients, productId]);

  return (
    <Modal header="Детали ингредиента" onClose={onCloseModal}>
      {product && <IngredientDetails ingredient={product} />}
    </Modal>
  );
}

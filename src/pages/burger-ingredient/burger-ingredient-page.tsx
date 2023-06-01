import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { IIngredient } from "../../models/ingredient";
import { TDispatch } from "../../models";
import { getIngredients } from "../../services/actions/ingredients";
import styles from "./burger-ingredient-page.module.css";

export default function BurgerIngredientPage() {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<TDispatch>();
  const ingredients = useSelector(
    (state: { ingredients: { data: IIngredient[] } }) => state.ingredients.data
  );
  const [product, setProduct] = useState<IIngredient>();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    setProduct(ingredients?.find(({ _id }) => _id === productId));
  }, [ingredients, productId]);

  return product ? (
    <div className={styles.container}>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <IngredientDetails ingredient={product} />
    </div>
  ) : (
    <></>
  );
}

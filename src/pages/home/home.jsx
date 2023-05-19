import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import styles from "./home.module.css";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";

export function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.container}>
        <div className={styles.side}>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </h1>
          <BurgerIngredients />
        </div>
        <div className={styles.constructorContainer}>
          <BurgerConstructor />
        </div>
      </main>
    </DndProvider>
  );
}

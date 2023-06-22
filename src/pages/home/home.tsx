import { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { useAppDispatch } from "../../hooks/store";
import { getIngredients } from "../../services/actions/ingredients";
import styles from "./home.module.css";

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();

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
};

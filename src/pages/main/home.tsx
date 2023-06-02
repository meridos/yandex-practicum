import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import styles from "./home.module.css";
import { FC } from "react";

export const Home: FC = () => {
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

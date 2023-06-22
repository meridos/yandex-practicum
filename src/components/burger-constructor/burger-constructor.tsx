import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  APPEND_BUN_CART,
  APPEND_INGREDIENT_CART,
  REMOVE_CART,
  SORT_CART,
} from "../../services/actions/cart";
import Order from "../order/order";
import styles from "./burger-constructor.module.css";
import { nanoid } from "@reduxjs/toolkit";
import { IIngredient, IState } from "../../models";
import { PropsWithChildren } from "react";
import { ICartIngredient } from "../../models/cart-ingredient";
import { useAppDispatch, useAppSelector } from "../../hooks/store";

interface IDataFromState {
  ingredients: IIngredient[];
  bunIngredient?: string;
  orderIngredients: ICartIngredient[];
}

const constructorDataSelector = (state: IState): IDataFromState => ({
  ingredients: state.ingredients.data,
  bunIngredient: state.cart.bun || undefined,
  orderIngredients: state.cart.ingredients,
});

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const { ingredients, bunIngredient, orderIngredients } = useAppSelector(
    constructorDataSelector
  );
  const [ingredientsMap, setIngredientsMap] = useState(new Map());

  useEffect(() => {
    setIngredientsMap(
      new Map(ingredients.map((ingredient) => [ingredient._id, ingredient]))
    );
  }, [ingredients]);

  const onDropBun = (item: IIngredient) => {
    dispatch(APPEND_BUN_CART(item._id));
  };
  const onDropIngredient = (item: IIngredient) => {
    dispatch(
      APPEND_INGREDIENT_CART({
        id: item._id,
        uuid: nanoid(),
      })
    );
  };

  const FirstBunItem = () => (
    <BunItem
      first={true}
      ingredient={ingredientsMap.get(bunIngredient)}
      onDrop={onDropBun}
    />
  );
  const LastBunItem = () => (
    <BunItem
      first={false}
      ingredient={ingredientsMap.get(bunIngredient)}
      onDrop={onDropBun}
    />
  );

  const onDeleteItem = (uuid: string) => {
    dispatch(REMOVE_CART(uuid));
  };
  const onSortItem = (prevUuid: string, newUuid: string) => {
    if (prevUuid === newUuid) return;

    dispatch(
      SORT_CART({
        prevUuid,
        newUuid,
      })
    );
  };

  const ScrollItems = () => (
    <DropTarget
      accept="ingredient"
      onDrop={onDropIngredient}
      className={styles.scrollItems}
    >
      {orderIngredients.length ? (
        orderIngredients.map(({ id, uuid }) => {
          const ingredient = ingredientsMap.get(id);

          if (!ingredient) return null;

          return (
            <React.Fragment key={uuid}>
              <ProductItem
                ingredient={ingredient}
                uuid={uuid}
                onDelete={() => onDeleteItem(uuid)}
                onSortItem={(dropItem) => onSortItem(uuid, dropItem.uuid)}
              />
            </React.Fragment>
          );
        })
      ) : (
        <div className={`${styles.itemEmpty}`}>
          <div className={`${styles.emptyElement}`}>
            <span className={styles.emptyElementText}>
              Перенесите сюда ингредиент
            </span>
          </div>
        </div>
      )}
    </DropTarget>
  );

  return (
    <div className={styles.items}>
      <FirstBunItem />
      <ScrollItems />
      <LastBunItem />
      <Order bunItem={bunIngredient} orderIngredients={orderIngredients} />
    </div>
  );
};

interface IProductItemProps {
  ingredient: IIngredient;
  uuid: string;
  onDelete: () => void;
  onSortItem: (ingredient: ICartIngredient) => void;
}

const ProductItem: FC<IProductItemProps> = (props) => {
  const [, drag] = useDrag({
    type: "order",
    item: { uuid: props.uuid },
  });

  return (
    <DropTarget onDrop={props.onSortItem} accept="order">
      <div ref={drag} className={styles.item}>
        <div className={styles.itemDrag}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={props.ingredient.name}
          thumbnail={props.ingredient.image_mobile}
          price={props.ingredient.price}
          handleClose={props.onDelete}
        />
      </div>
    </DropTarget>
  );
};

interface IBunItemProps {
  first: boolean;
  ingredient?: IIngredient;
  onDrop: (ingredient: IIngredient) => void;
}

const BunItem: FC<IBunItemProps> = (props) => {
  const text = `${props.ingredient?.name} (${props.first ? "верх" : "низ"})`;

  return (
    <DropTarget onDrop={props.onDrop} accept="bun">
      {props.ingredient ? (
        <div className={styles.bunItem}>
          <ConstructorElement
            text={text}
            thumbnail={props.ingredient.image_mobile}
            price={props.ingredient.price}
            isLocked={true}
            type={props.first ? "top" : "bottom"}
          />
        </div>
      ) : (
        <div className={styles.bunItem}>
          <div
            className={`${styles.bunEmptyElement} ${
              props.first
                ? "constructor-element_pos_top"
                : "constructor-element_pos_bottom"
            }`}
          >
            <span className={styles.emptyElementText}>
              Перенесите сюда булку
            </span>
          </div>
        </div>
      )}
    </DropTarget>
  );
};

interface IDropTargetProps {
  onDrop: (value: any) => void;
  accept: "bun" | "order" | "ingredient";
  className?: string;
}

const DropTarget: FC<PropsWithChildren<IDropTargetProps>> = ({
  children,
  onDrop,
  accept,
  className,
}) => {
  const [{ isHover }, dropTarget] = useDrop({
    accept,
    drop(item) {
      onDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  className = [className, isHover && styles.emptyElementHover]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} ref={dropTarget}>
      {children}
    </div>
  );
};

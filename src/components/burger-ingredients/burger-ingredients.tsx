import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { INGREDIENT_ROUTE } from "../../const/routes";
import { useAppSelector } from "../../hooks/store";
import { IIngredient, IState, TIngredientType } from "../../models";
import styles from "./burger-ingredients.module.css";

interface IProductsGroup {
  type: TIngredientType;
  title: string;
  ingredients: IIngredient[];
}

const ingredientTypesMap: Record<TIngredientType, string> = {
  main: "Начинки",
  bun: "Булки",
  sauce: "Соусы",
};
const tabs: { type: TIngredientType; title: string }[] = (
  Object.keys(ingredientTypesMap) as TIngredientType[]
).map((type) => ({
  type,
  title: ingredientTypesMap[type],
}));

const ingredientsDataSelector = (state: IState) => ({
  ingredients: state.ingredients.data,
  countsMap: state.cart.ingredients.reduce((map, { id }) => {
    map.set(id, (map.get(id) || 0) + 1);

    return map;
  }, new Map(state.cart.bun ? [[state.cart.bun, 2]] : [])),
});

export const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<TIngredientType>("bun");
  const [groupProducts, setGroupProducts] = useState<IProductsGroup[]>([]);
  const [thresholds, setThreshholds] = useState<{
    [tab: string]: number;
  }>({});
  const { ingredients, countsMap } = useAppSelector(ingredientsDataSelector);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  let location = useLocation();

  // eslint-disable-next-line
  const categoriesRefs: Record<
    TIngredientType,
    MutableRefObject<HTMLDivElement | null>
  > = {
    main: useRef(null),
    bun: useRef(null),
    sauce: useRef(null),
  };

  useEffect(() => {
    setGroupProducts(getProductsList(ingredients));
  }, [ingredients]);

  useEffect(() => {
    const keys = Object.keys(thresholds) as TIngredientType[];
    const closestTab =
      keys.length &&
      keys.reduce((max, key) =>
        thresholds[key] > thresholds[max] ? key : max
      );

    if (closestTab) {
      setCurrentTab(closestTab);
    }
  }, [thresholds]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target: HTMLDivElement = entry.target as HTMLDivElement;
          const datasetType = target.dataset["type"] as string;

          setThreshholds((state) => ({
            ...state,
            [datasetType]: entry.isIntersecting ? entry.intersectionRatio : 0,
          }));
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: new Array(10).fill(null).map((_, i) => (i + 1) / 10),
      }
    );

    groupProducts.forEach((group) => {
      const current = categoriesRefs[group.type].current;

      if (current) {
        observer.observe(current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [
    groupProducts,
    categoriesRefs,
    categoriesRefs.bun,
    categoriesRefs.main,
    categoriesRefs.sauce,
  ]);

  function onTabClick(currentTab: TIngredientType) {
    setCurrentTab(currentTab);
    categoriesRefs[currentTab]?.current?.scrollIntoView();
  }

  function onProductClick(ingredient: IIngredient) {
    navigate(`${INGREDIENT_ROUTE}/${ingredient._id}`, {
      state: { backgroundLocation: location },
    });
  }

  return (
    <div className={styles.wrapper}>
      <Tabs currentTab={currentTab} onChange={onTabClick} />

      <div ref={scrollContainerRef} className={styles.categoriesList}>
        {groupProducts.map(({ type, title, ingredients }) => (
          <div key={type} ref={categoriesRefs[type]} data-type={type}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.productList}>
              {ingredients.map((ingredient) => (
                <React.Fragment key={ingredient._id}>
                  <ProductItem
                    count={countsMap.get(ingredient._id)}
                    ingredient={ingredient}
                    onClick={() => onProductClick(ingredient)}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface IProductItemProps {
  ingredient: IIngredient;
  onClick: () => void;
  count?: number;
}

const ProductItem: FC<IProductItemProps> = React.memo((props) => {
  const [, drag] = useDrag({
    type: props.ingredient.type === "bun" ? "bun" : "ingredient",
    item: props.ingredient,
  });

  return (
    <section className={styles.productItem} onClick={props.onClick} ref={drag}>
      <div className={styles.productItemCount}>
        {props.count ? <Counter count={props.count} size="default" /> : null}
      </div>
      <img
        src={props.ingredient.image}
        className={styles.productItemImg}
        alt={props.ingredient.name}
      />
      <p className={styles.productItemPrice}>
        <span className="mr-2">{props.ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <h4 className="text text_type_main-default">{props.ingredient.name}</h4>
    </section>
  );
});

function getProductsList(ingredients: IIngredient[]): Array<IProductsGroup> {
  if (!ingredients) {
    return [];
  }

  const typesGroupMap = new Map<TIngredientType, IIngredient[]>();

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    const typeIngredients = typesGroupMap.get(ingredient.type) || [];

    typeIngredients.push(ingredient);

    typesGroupMap.set(ingredient.type, typeIngredients);
  }

  const indexTabMap = tabs.reduce((res, { type }, i) => {
    res[type] = i;

    return res;
  }, {} as Record<TIngredientType, number>);

  return Array.from(typesGroupMap)
    .map(([type, typeIngredients]) => ({
      type: type,
      title: ingredientTypesMap[type],
      ingredients: typeIngredients,
    }))
    .sort((a, b) => indexTabMap[a.type] - indexTabMap[b.type]);
}

interface ITabsProps {
  onChange: (tab: TIngredientType) => void;
  currentTab: TIngredientType;
}

const Tabs: FC<ITabsProps> = (props) => {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ type, title }) => (
        <Tab
          key={type}
          value={type}
          active={props.currentTab === type}
          onClick={(item: string) => props.onChange(item as TIngredientType)}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
};

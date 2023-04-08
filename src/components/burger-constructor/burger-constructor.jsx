import React from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default class BurgerConstructor extends React.Component {
  render() {
    return (
      <>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.itemDrag}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text="Хрустящие минеральные кольца"
              thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
              price="20"
            />
          </div>
          <div className={styles.scrollItems}>
            <div className={styles.item}>
              <div className={styles.itemDrag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="text"
                thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
                price="20"
              />
            </div>
            <div className={styles.item}>
              <div className={styles.itemDrag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="text"
                thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
                price="20"
              />
            </div>
            <div className={styles.item}>
              <div className={styles.itemDrag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="text"
                thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
                price="20"
              />
            </div>
            <div className={styles.item}>
              <div className={styles.itemDrag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="text"
                thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
                price="20"
              />
            </div>
            <div className={styles.item}>
              <div className={styles.itemDrag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="text"
                thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
                price="20"
              />
            </div>
            <div className={styles.item}>
              <div className={styles.itemDrag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="text"
                thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
                price="20"
              />
            </div>
            <div className={styles.item}>
              <div className={styles.itemDrag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="text"
                thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
                price="20"
              />
            </div>
            <div className={styles.item}>
              <div className={styles.itemDrag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="text"
                thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
                price="20"
              />
            </div>
            <div className={styles.item}>
              <div className={styles.itemDrag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="text"
                thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
                price="20"
              />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemDrag}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text="text"
              thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
              price="20"
            />
          </div>
        </div>
        <div className={styles.total}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <div className={styles.totalIcon}>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="ml-10"
          >
            Оформить заказ
          </Button>
        </div>
      </>
    );
  }
}

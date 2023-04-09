import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <BurgerIcon type="primary" />
              <span className={styles.menuItemText}>Конструктор</span>
            </li>
            <li className={styles.menuItem}>
              <ListIcon type="secondary" />
              <span className={styles.menuItemText}>Лента заказов</span>
            </li>
          </ul>
        </nav>
        <Logo />
        <nav>
          <ul className={styles.rightMenu}>
            <li className={styles.menuItem}>
              <ProfileIcon type="secondary" />
              <span className={styles.menuItemText}>Личный кабинет</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.menu}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.menuItemActive : ""}`
              }
            >
              <BurgerIcon type="primary" />
              <span className={styles.menuItemText}>Конструктор</span>
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.menuItemActive : ""}`
              }
            >
              <ListIcon type="secondary" />
              <span className={styles.menuItemText}>Лента заказов</span>
            </NavLink>
          </ul>
        </nav>
        <Logo />
        <nav>
          <ul className={styles.rightMenu}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.menuItemActive : ""}`
              }
            >
              <ProfileIcon type="secondary" />
              <span className={styles.menuItemText}>Личный кабинет</span>
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}

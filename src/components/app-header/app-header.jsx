import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";

function LinkItem({ icon: Icon, to, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.menuItem} ${isActive ? styles.menuItemActive : ""}`
      }
      end
    >
      {({ isActive }) => (
        <>
          {Icon && <Icon type={isActive ? "primary" : "secondary"} />}
          <span className={styles.menuItemText}>{text}</span>
        </>
      )}
    </NavLink>
  );
}

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.menu}>
            <LinkItem icon={BurgerIcon} to="/" text="Конструктор" />
            <LinkItem
              icon={ListIcon}
              to="/profile/orders"
              text="Лента заказов"
            />
          </ul>
        </nav>
        <Logo />
        <nav>
          <ul className={styles.rightMenu}>
            <LinkItem icon={ProfileIcon} to="/profile" text="Личный кабинет" />
          </ul>
        </nav>
      </div>
    </header>
  );
}

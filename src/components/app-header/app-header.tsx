import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  HOME_ROUTE,
  PROFILE_ORDERS_ROUTE,
  PROFILE_ROUTE,
} from "../../const/routes";
import { FC } from "react";

interface ILinkItemProps {
  icon?: FC<Parameters<typeof ProfileIcon>[0]>;
  to: string;
  text: string;
}

const LinkItem: FC<ILinkItemProps> = ({ icon: Icon, to, text }) => {
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
};

export const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.menu}>
            <LinkItem icon={BurgerIcon} to={HOME_ROUTE} text="Конструктор" />
            <LinkItem
              icon={ListIcon}
              to={PROFILE_ORDERS_ROUTE}
              text="Лента заказов"
            />
          </ul>
        </nav>
        <Logo />
        <nav>
          <ul className={styles.rightMenu}>
            <LinkItem
              icon={ProfileIcon}
              to={PROFILE_ROUTE}
              text="Личный кабинет"
            />
          </ul>
        </nav>
      </div>
    </header>
  );
};

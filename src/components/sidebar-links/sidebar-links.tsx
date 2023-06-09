import { NavLink } from "react-router-dom";
import styles from "./sidebar-links.module.css";
import { FC } from "react";

interface IRoute {
  to: string;
  text: string;
}

interface IItemProps {
  route: IRoute;
}

interface ISidebarLinksProps {
  routes: IRoute[];
  footerText?: string;
  className?: string;
}

const Item: FC<IItemProps> = ({ route }) => (
  <NavLink
    className={({ isActive }) =>
      `${styles.link} ${isActive ? styles.linkActive : ""}`
    }
    to={route.to}
    end
  >
    {route.text}
  </NavLink>
);

export const SidebarLinks: FC<ISidebarLinksProps> = ({
  routes,
  footerText,
  className,
}) => (
  <div className={`${styles.container} ${className || ""}`}>
    {routes.map((route) => (
      <Item route={route} key={route.to} />
    ))}
    {footerText && (
      <p className="mt-20 text text_type_main-default text_color_inactive">
        {footerText}
      </p>
    )}
  </div>
);

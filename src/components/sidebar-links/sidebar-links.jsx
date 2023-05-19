import { NavLink } from "react-router-dom";
import styles from "./sidebar-links.module.css";

export function SidebarLinks({ routes, footerText }) {
  const Item = ({ route }) => (
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

  return (
    <div className={styles.container}>
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
}

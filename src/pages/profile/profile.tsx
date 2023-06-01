import { Outlet } from "react-router-dom";
import { SidebarLinks } from "../../components/sidebar-links/sidebar-links";
import styles from "./profile.module.css";
import { FC } from "react";

export const ProfilePage: FC = () => {
  return (
    <div className={styles.container}>
      <SidebarLinks
        routes={[
          { to: "", text: "Профиль" },
          { to: "orders", text: "История заказов" },
          { to: "logout", text: "Выход" },
        ]}
        footerText="В этом разделе вы можете изменить свои персональные данные"
      />
      <div className={styles.pageContainer}>
        <Outlet />
      </div>
    </div>
  );
};

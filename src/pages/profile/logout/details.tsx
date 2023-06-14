import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../const/routes";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { logout } from "../../../services/actions/profile";
import styles from "./details.module.css";

export const LogoutPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogout, error, loading } = useAppSelector((state) => ({
    isLogout: !state.profile.name,
    error: state.profile.request.error,
    loading: state.profile.request.loading,
  }));

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (isLogout) {
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [isLogout, navigate]);

  return (
    <div className="mt-30">
      {loading ? <>Выход...</> : <p className={styles.error}>{error}</p>}
    </div>
  );
};

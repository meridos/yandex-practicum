import { FC, useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { IGetUserResponse } from "../../api/auth";
import { LOGIN_ROUTE } from "../../const/routes";
import { useAppDispatch } from "../../hooks/store";
import { getUser } from "../../services/actions/profile";

interface ProtectedRouteElementProps {
  element: JSX.Element;
  authRestricted?: boolean;
}

export const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({
  element,
  authRestricted,
}) => {
  const dispatch = useAppDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState<IGetUserResponse["user"] | undefined>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const init = useRef<boolean | null>(null);

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {})
      .finally(() => {
        setUserLoaded(true);
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (authRestricted && user && !init.current) {
      init.current = true;
      navigate(-1);
    }

    return () => {
      init.current = null;
    };
  }, [user, authRestricted, navigate]);

  if (!isUserLoaded || (user && authRestricted)) {
    return null;
  }

  return user || authRestricted ? (
    element
  ) : (
    <Navigate
      to={LOGIN_ROUTE}
      state={{ protectedFrom: pathname }}
      replace={true}
    />
  );
};

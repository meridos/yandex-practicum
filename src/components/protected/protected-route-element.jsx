import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../services/actions/profile";
import PropTypes from "prop-types";
import { LOGIN_ROUTE } from "../../const/routes";

export const ProtectedRouteElement = ({ element, authRestricted }) => {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const init = useRef();

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .then((user) => {
        setUser(user);
      })
      .finally(() => {
        setUserLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (authRestricted && user && !init.current) {
      init.current = true;
      navigate(-1);
    }

    return () => {
      init.current = null;
    };
  }, [user, authRestricted]);

  if (!isUserLoaded || (user && authRestricted)) {
    return null;
  }

  return user || authRestricted ? (
    element
  ) : (
    <Navigate to={LOGIN_ROUTE} state={{ protectedFrom: pathname }} />
  );
};
ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  authRestricted: PropTypes.bool,
};

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { authActions } from "../../store.js/auth-slice";
import { logout } from "../../api/api";
import classes from "./Logout.module.css";

const Logout = () => {
  const dispatch = useDispatch();
  const removeCookie = useCookies(["jwt"])[2];

  const logoutHandler = () => {
    dispatch(authActions.logOut());
    removeCookie("jwt");
    logout();
  };

  return (
    <li className={classes.logout}>
      <Link to="/login" onClick={logoutHandler}>
        Logout
      </Link>
    </li>
  );
};

export default Logout;

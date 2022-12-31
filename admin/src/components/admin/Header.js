import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import classes from "./Header.module.css";
import logo from "../../images/logo.png";
import Tab from "../admin-menus/Tab";
import { logout } from "../../api/api";
import { authActions } from "../../store/auth-slice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setCookie = useCookies(["jwt"])[1];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const gotoHomepageHandler = () => {
    navigate("/");
  };

  const logoutHandler = async () => {
    const res = await logout();
    if (res.status === "success") {
      setCookie("jwt", res.token);
    }
    dispatch(authActions.logOut());
  };

  const accountsLink = isLoggedIn ? "users" : "/";
  const createLink = isLoggedIn ? "new-account" : "/";

  return (
    <div className={classes.header}>
      <div className={classes.logo} onClick={gotoHomepageHandler}>
        <img src={logo} alt="logo" />
      </div>
      <ul>
        <Tab title="Accounts" link={accountsLink} />
        <Tab title="Create account" link={createLink} />
      </ul>
      {isLoggedIn && (
        <Link to="/login" onClick={logoutHandler}>
          Logout
        </Link>
      )}
      {!isLoggedIn && <Link to="/login">Login</Link>}
    </div>
  );
};

export default Header;

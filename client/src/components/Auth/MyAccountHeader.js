import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import classes from "./MyAccountHeader.module.css";
import MenuIcon from "../icons/MenuIcon";
import logo from "../../images/logo.png";
import Dashboard from "../icons/Dashboard";
import TransferIcon from "../icons/TransferIcon";
import TransHistoryIcon from "../icons/TransHistoryIcon";
import PinIcon from "../icons/PinIcon";
import ImageForm from "./ImageForm";
import BackdropContext from "../store/backdrop-context";
import { authActions } from "../../store.js/auth-slice";
import { logout } from "../../api/api";

const MyAccountHeader = (props) => {
  const menuRef = useRef();
  const bckdrpCtx = useContext(BackdropContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setCookie = useCookies(["jwt"])[1];
  const photo = useSelector((state) => state.authSlice.user.photo);

  const linkHomepageHandler = () => {
    navigate("/");
  };

  const logoutHandler = async () => {
    const res = await logout();
    if (res.status === "success") {
      setCookie("jwt", res.token);
    }
    dispatch(authActions.logOut());
  };

  const displayMenuHandler = () => {
    menuRef.current.classList.toggle(classes.display);
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" onClick={linkHomepageHandler} />
      </div>
      <div className={`${classes.menu} ${classes.display}`} ref={menuRef}>
        <div className={classes.flexside}>
          <Link to="/account/dashboard">
            <Dashboard />
            <span>Dashbord</span>
          </Link>
        </div>
        <div className={classes.flexside} onClick={bckdrpCtx.onShowLocTransfer}>
          <button>
            <TransferIcon />
            <span>Local Transfer</span>
          </button>
        </div>
        <div className={classes.flexside} onClick={bckdrpCtx.onShowIntTransfer}>
          <button>
            <TransferIcon />
            <span>International Transfer</span>
          </button>
        </div>
        <div className={classes.flexside}>
          <Link to="/account/transaction-history">
            <TransHistoryIcon />
            <span>Transaction History</span>
          </Link>
        </div>
        <div className={classes.flexside} onClick={bckdrpCtx.onShowChangePin}>
          <button type="button">
            <PinIcon />
            <span>Change Pin</span>
          </button>
        </div>
        <div className={classes.upload}>
          <ImageForm />
        </div>
      </div>
      <div className={classes.logout}>
        <div className={classes["user-image"]}>
          <img src={photo} alt="user" />
        </div>
        <Link to="/login" onClick={logoutHandler}>
          Logout
        </Link>
      </div>
      <button
        type="button"
        className={classes.menuIcon}
        onClick={displayMenuHandler}
      >
        <MenuIcon />
      </button>
    </header>
  );
};

export default MyAccountHeader;

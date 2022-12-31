import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";

import classes from "./Header.module.css";
import logo from "../../images/logo.png";
import BankingMenu from "../menus/BankingMenu";
import Borrowing from "../menus/Borrowing";
import Investing from "../menus/Investing";
import Insurance from "../menus/Insurance";
import WellBeing from "../menus/WellBeing";
import Help from "../menus/Help";
import Login from "../menus/Login";
import Logout from "../menus/Logout";
import MyAccountPage from "../menus/MyAcoountPage";
import MenuIcon from "../icons/MenuIcon";

const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const menuRef = useRef();

  const displayMenuHandler = () => {
    menuRef.current.classList.toggle(classes.menu);
  };

  return (
    <Fragment>
      <div className={classes.header}>
        <div className={classes.logo}>
          <img src={logo} alt="logo" />
        </div>
        <ul ref={menuRef} className={classes.menu}>
          <BankingMenu />
          <Borrowing />
          <Investing />
          <Insurance />
          <WellBeing />
          <Help />
          {isLoggedIn && <MyAccountPage />}
          {!isLoggedIn && <Login />}
          {isLoggedIn && <Logout />}
        </ul>
        <div className={classes.menuicon} onClick={displayMenuHandler}>
          <MenuIcon />
        </div>
      </div>
    </Fragment>
  );
};

export default Header;

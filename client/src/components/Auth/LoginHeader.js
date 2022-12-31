import { useNavigate } from "react-router-dom";

import classes from "./LoginHeader.module.css";
import logo from "../../images/logo.png";

const LoginHeader = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <div>
        <img src={logo} alt="logo" onClick={goToHomePage} />
      </div>
      <h2>
        Get blissful experience from our reliable online banking, we are happy
        to serve you!
      </h2>
    </header>
  );
};

export default LoginHeader;

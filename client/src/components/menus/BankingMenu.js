import { Link } from "react-router-dom";
import classes from "./Menu.module.css";

const BankingMenu = () => {
  return (
    <li>
      <Link to="banking" className={classes.link}>
        Banking
      </Link>
    </li>
  );
};

export default BankingMenu;

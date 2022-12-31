import { Link } from "react-router-dom";
import classes from "./Menu.module.css";

const Investing = () => {
  return (
    <li>
      <Link to="investing" className={classes.link}>
        Investing
      </Link>
    </li>
  );
};

export default Investing;

import { Link } from "react-router-dom";
import classes from "./Menu.module.css";

const Borrowing = () => {
  return (
    <li>
      <Link to="borrowing" className={classes.link}>
        Borrowing
      </Link>
    </li>
  );
};

export default Borrowing;

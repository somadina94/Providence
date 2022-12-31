import { Link } from "react-router-dom";
import classes from "./Menu.module.css";

const Help = () => {
  return (
    <li>
      <Link to="help" className={classes.link}>
        Help
      </Link>
    </li>
  );
};

export default Help;

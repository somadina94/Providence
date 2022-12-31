import { Link } from "react-router-dom";
import classes from "./Menu.module.css";

const Insurance = () => {
  return (
    <li>
      <Link to="insurance" className={classes.link}>
        Insurance
      </Link>
    </li>
  );
};

export default Insurance;

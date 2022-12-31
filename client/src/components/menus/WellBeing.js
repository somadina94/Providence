import { Link } from "react-router-dom";
import classes from "./Menu.module.css";

const WellBeing = () => {
  return (
    <li>
      <Link to="wellbeing" className={classes.link}>
        Wellbeing
      </Link>
    </li>
  );
};

export default WellBeing;

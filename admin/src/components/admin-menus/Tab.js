import { Link } from "react-router-dom";

import classes from "./Tab.module.css";

const Tab = (props) => {
  return (
    <li className={classes.link}>
      <Link to={props.link}>{props.title}</Link>
    </li>
  );
};

export default Tab;

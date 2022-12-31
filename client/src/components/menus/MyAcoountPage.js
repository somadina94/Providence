import { Link } from "react-router-dom";
import classes from "./MyAccountPage.module.css";

const MyAccountPage = () => {
  return (
    <li className={classes.account}>
      <Link to="/account/dashboard">Dashboard</Link>
    </li>
  );
};

export default MyAccountPage;

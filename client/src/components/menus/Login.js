import { Link } from "react-router-dom";
import classes from "./Login.module.css";

const Login = (props) => {
  return (
    <li className={classes.login}>
      <Link to="/login">Login</Link>
    </li>
  );
};

export default Login;

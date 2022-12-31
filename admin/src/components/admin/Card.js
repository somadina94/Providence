import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import classes from "./Card.module.css";
import { spinnerActions } from "../../store/spinner-slice";
import { alertActions } from "../../store/alert-slice";
import { deactiveAccount } from "../../api/api";
import { deleteAccount } from "../../api/api";

const Card = (props) => {
  const dispatch = useDispatch();
  const { jwt } = useCookies(["jwt"])[0];

  const { user } = props;

  const deleteHandler = async () => {
    dispatch(spinnerActions.showSpinner());

    const data = await deleteAccount(user._id, jwt);

    if (data === "") {
      dispatch(
        alertActions.setState({
          message: "Account deleted successfully",
          status: "success",
        })
      );
    } else {
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }
    dispatch(spinnerActions.hideSpinner());
  };

  const deactivateHandler = async () => {
    dispatch(spinnerActions.showSpinner());

    const data = await deactiveAccount("blocked", user._id, jwt);

    if (data.status === "success") {
      dispatch(
        alertActions.setState({ message: data.message, status: data.status })
      );
    } else {
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }
    dispatch(spinnerActions.hideSpinner());
  };

  return (
    <li>
      <div className={classes.card}>
        <div className={classes.actions}>
          <Link to={`${user._id}`}>Update Profile</Link>
          <Link to={`${user._id}/transactions`}>Update Transactions</Link>
        </div>
        <p>{user.name}</p>
        <p>{user.role}</p>
        <p>{user.status}</p>
        <div className={classes.photo}>
          <img src={user.photo} alt="user-name" />
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={deactivateHandler}>
            Block account
          </button>
          <button type="button" onClick={deleteHandler}>
            Delete Account
          </button>
        </div>
      </div>
    </li>
  );
};

export default Card;

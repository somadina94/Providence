import { Fragment } from "react";
import { useRouteError } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./ErrorModal.module.css";
import { alertActions } from "../../store/alert-slice";

const ErrorModal = () => {
  const dispatch = useDispatch();
  const data = useRouteError();

  dispatch(alertActions.setState({ message: data.message, status: "error" }));

  const message = "Something went wrong!";

  return (
    <Fragment>
      <section className={classes.error}>
        <p>{message}</p>
      </section>
    </Fragment>
  );
};

export default ErrorModal;

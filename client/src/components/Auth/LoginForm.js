import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInput from "../hooks/userInput";

import classes from "./LoginForm.module.css";
import { authActions } from "../../store.js/auth-slice";
import { alertActions } from "../../store.js/alert-slice";
import { loginUser } from "../../api/api";
import LoadSpinner from "../UI/LoadSpinner";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);

  const {
    value: enteredUsername,
    enteredValueIsValid: enteredUsernameIsValid,
    hasError: enteredUsernameIsInvalid,
    valueInputChangedHandler: usernameInputChangedHandler,
    valueInputBlurHandler: usernameInputBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim().length > 4 && value.trim().length < 16);
  const {
    value: enteredPin,
    enteredValueIsValid: enteredPinIsValid,
    hasError: enteredPinIsInvalid,
    valueInputChangedHandler: pinInputChangedHandler,
    valueInputBlurHandler: pinInputBlurHandler,
    reset: resetPinInput,
  } = useInput((value) => value.trim().length === 4);

  let formIsValid = false;

  if (enteredUsernameIsValid && enteredPinIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    const username = enteredUsername;
    const pin = enteredPin;

    const data = await loginUser(username, pin);

    if (data.status === "success") {
      setShowSpinner(false);
      resetUsernameInput();
      resetPinInput();

      dispatch(
        authActions.verify({
          securityQuestion: data.data.user.securityQuestion,
        })
      );
      navigate("/login/security", { replace: true });
    } else {
      setShowSpinner(false);
      resetUsernameInput();
      resetPinInput();
      dispatch(
        alertActions.setState({
          message: data.message,
          status: "error",
        })
      );
    }
  };

  const userNameclasses = enteredUsernameIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const pinNameclasses = enteredPinIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <Fragment>
      {showSpinner && <LoadSpinner />}
      <form onSubmit={submitHandler} className={classes.form}>
        <h2>Login to Online Banking</h2>
        <div className={userNameclasses}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={enteredUsername}
            onChange={usernameInputChangedHandler}
            onBlur={usernameInputBlurHandler}
          />
          {enteredUsernameIsInvalid && (
            <p className={classes["error-text"]}>
              Username must be 4-8 characters long
            </p>
          )}
        </div>
        <div className={pinNameclasses}>
          <label htmlFor="password">Pin</label>
          <input
            type="password"
            value={enteredPin}
            onChange={pinInputChangedHandler}
            onBlur={pinInputBlurHandler}
          />
          {enteredPinIsInvalid && (
            <p className={classes["error-text"]}>Pin must be 4 digit number</p>
          )}
        </div>
        <div className={classes.group}>
          <button type="submit" disabled={!formIsValid}>
            Login
          </button>
          <Link to="/forgot-pin">Forgot pin?</Link>
        </div>
      </form>
    </Fragment>
  );
};

export default LoginForm;

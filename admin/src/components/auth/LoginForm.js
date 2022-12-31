import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/userInput";
import { useCookies } from "react-cookie";

import classes from "./LoginForm.module.css";
import { authActions } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";
import { spinnerActions } from "../../store/spinner-slice";
import { loginUser } from "../../api/api";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setCookie = useCookies(["jwt"])[1];

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
    dispatch(spinnerActions.showSpinner());

    const username = enteredUsername;
    const pin = enteredPin;

    const data = await loginUser(username, pin);

    if (data.status === "success") {
      dispatch(authActions.login({ user: data.data.user }));
      setCookie("jwt", data.token);
      navigate("users", { replace: true });
    } else {
      dispatch(
        alertActions.setState({
          message: data.message,
          status: "error",
        })
      );
    }
    resetUsernameInput();
    resetPinInput();
    dispatch(spinnerActions.hideSpinner());
  };

  const userNameclasses = enteredUsernameIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const pinNameclasses = enteredPinIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
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
  );
};

export default LoginForm;

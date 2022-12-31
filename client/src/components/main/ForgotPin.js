import useInput from "../hooks/userInput";
import { useDispatch, useSelector } from "react-redux";

import classes from "./ForgotPin.module.css";
import { forgotPin } from "../../api/api";
import LoadSpinner from "../UI/LoadSpinner";
import { transferActions } from "../../store.js/transfer-slice";
import { alertActions } from "../../store.js/alert-slice";

const ForgotPin = () => {
  const dispatch = useDispatch();
  const showSpinner = useSelector((state) => state.transferSlice.showSpinner);
  const {
    value: username,
    enteredValueIsValid: usernameIsValid,
    valueInputChangedHandler: usernameInputChangedHandler,
    valueInputBlurHandler: usernameInputBlurHandler,
    hasError: usernameIsInvalid,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (usernameIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(transferActions.showSpinner());

    const data = await forgotPin({ username });

    if (data.status === "success") {
      dispatch(transferActions.hideSpinner());
      dispatch(
        alertActions.setState({ message: data.message, status: data.status })
      );
    } else {
      dispatch(transferActions.hideSpinner());
      dispatch(
        alertActions.setState({
          message:
            "There was an error sending your reset email, please try again later.",
          status: "error",
        })
      );
    }

    resetUsernameInput();
  };

  const formClasses = usernameIsInvalid
    ? `${classes.form} ${classes.invalid}`
    : classes.form;

  return (
    <form className={formClasses} onSubmit={submitHandler}>
      {showSpinner && <LoadSpinner />}
      <label>Enter your username and proceed</label>
      <input
        type="text"
        value={username}
        onChange={usernameInputChangedHandler}
        onBlur={usernameInputBlurHandler}
      />
      <button type="submit" disabled={!formIsValid}>
        Process
      </button>
    </form>
  );
};

export default ForgotPin;

import { Fragment, useState } from "react";
import { useCookies } from "react-cookie";
import useInput from "../hooks/userInput";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./SecurityForm.module.css";
import { verifyLogin } from "../../api/api";

import LoadSpinner from "../UI/LoadSpinner";
import { alertActions } from "../../store.js/alert-slice";
import { authActions } from "../../store.js/auth-slice";

const SecurityForm = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const setCookie = useCookies(["jwt"])[1];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const securityQuestion = useSelector(
    (state) => state.authSlice.securityQuestion
  );

  const {
    value: enteredAnswer,
    enteredValueIsValid: enteredAnswerIsValid,
    hasError: enteredAnswerIsInvalid,
    valueInputChangedHandler: answerInputChangedHandler,
    valueInputBlurHandler: answerInputBlurHandler,
    reset: resetAnswerInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (enteredAnswerIsValid) {
    formIsValid = true;
  }

  const submitHanlder = async (event) => {
    event.preventDefault();
    setShowSpinner(true);

    const data = await verifyLogin(enteredAnswer);

    if (data.status === "success") {
      resetAnswerInput();
      setShowSpinner(false);
      setCookie("jwt", data.token, { path: "/" });
      dispatch(authActions.login({ user: data.data.user }));
      setTimeout(() => {
        setShowSpinner(false);
        if (data.data.user.role === "user") {
          navigate("/account/dashboard", { replace: true });
        } else if (data.data.user.role === "admin") {
          navigate("/account/admin/users", { replace: true });
        }
      }, 700);
    } else {
      setShowSpinner(false);
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }
  };

  const answerClasses = enteredAnswerIsInvalid
    ? `${classes.form} ${classes.invalid}`
    : classes.form;

  return (
    <Fragment>
      {showSpinner && <LoadSpinner />}
      <form className={answerClasses} onSubmit={submitHanlder}>
        <label htmlFor="security">{securityQuestion}</label>
        <input
          type="text"
          value={enteredAnswer}
          onChange={answerInputChangedHandler}
          onBlur={answerInputBlurHandler}
        />
        <button type="submit" disabled={!formIsValid}>
          Confirm
        </button>
      </form>
    </Fragment>
  );
};

export default SecurityForm;

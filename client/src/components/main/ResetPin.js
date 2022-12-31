import useInput from "../hooks/userInput";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import classes from "./ResetPin.module.css";
import { transferActions } from "../../store.js/transfer-slice";
import { alertActions } from "../../store.js/alert-slice";
import { resetPin } from "../../api/api";
import LoadSpinner from "../UI/LoadSpinner";

const ResetPin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const showSpinner = useSelector((state) => state.transferSlice.showSpinner);
  const {
    value: pin,
    enteredValueIsValid: pinIsValid,
    valueInputChangedHandler: pinInputChangedHandler,
    valueInputBlurHandler: pinInputBlurHandler,
    hasError: pinIsInvalid,
    reset: resetPinInput,
  } = useInput((value) => value.trim().length === 4);

  const {
    value: pinConfirm,
    enteredValueIsValid: pinConfirmIsValid,
    valueInputChangedHandler: pinConfirmInputChangedHandler,
    valueInputBlurHandler: pinConfirmInputBlurHandler,
    hasError: pinConfirmIsInvalid,
    reset: resetPinConfirmInput,
  } = useInput((value) => value.trim().length === 4);

  let formIsValid = false;
  if (pinIsValid && pinConfirmIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(transferActions.showSpinner());

    const data = await resetPin({ pin, pinConfirm }, params.token);

    if (data.status === "success") {
      dispatch(transferActions.hideSpinner());
      dispatch(
        alertActions.setState({
          message:
            "Your password reset was successful, please proceed to login into your account.",
          status: data.status,
        })
      );
      navigate("/login", { replace: true });
    } else {
      dispatch(transferActions.hideSpinner());
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }
    resetPinInput();
    resetPinConfirmInput();
  };

  const pinClasses = pinIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const pinConfirmClasses = pinConfirmIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {showSpinner && <LoadSpinner />}
      <div className={pinClasses}>
        <label>New pin</label>
        <input
          type="number"
          value={pin}
          onChange={pinInputChangedHandler}
          onBlur={pinInputBlurHandler}
        />
      </div>
      <div className={pinConfirmClasses}>
        <label>Confirm new pin</label>
        <input
          type="number"
          value={pinConfirm}
          onChange={pinConfirmInputChangedHandler}
          onBlur={pinConfirmInputBlurHandler}
        />
      </div>
      <button type="submit" disabled={!formIsValid}>
        Reset pin
      </button>
    </form>
  );
};

export default ResetPin;

import { Fragment, useContext } from "react";
import ReactDom from "react-dom";
import useInput from "../hooks/userInput";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";

import classes from "./PinForm.module.css";
import styles from "../UI/General.module.css";
import BackdropContext from "../store/backdrop-context";
import Backdrop from "../UI/Backdrop";
import { updateSettings } from "../../api/api";
import LoadSpinner from "../UI/LoadSpinner";
import { alertActions } from "../../store.js/alert-slice";
import { transferActions } from "../../store.js/transfer-slice";

const Overlay = () => {
  const dispatch = useDispatch();
  const bckdrpCtx = useContext(BackdropContext);
  const { jwt } = useCookies(["jwt"])[0];
  const showSpinner = useSelector((state) => state.transferSlice.showSpinner);

  const {
    value: currentPin,
    valueInputChangedHandler: currentPinInputChangedHandler,
    valueInputBlurHandler: currentPinInputBlurHandler,
    enteredValueIsValid: currentPinIsValid,
    hasError: currentPinIsInvalid,
    reset: currentPinInputReset,
  } = useInput((value) => value.trim().length === 4);

  const {
    value: newPin,
    valueInputChangedHandler: newPinInputChangedHandler,
    valueInputBlurHandler: newPinInputBlurHandler,
    enteredValueIsValid: newPinIsValid,
    hasError: newPinIsInvalid,
    reset: newPinInputReset,
  } = useInput((value) => value.trim().length === 4);

  const {
    value: newPinConfirm,
    valueInputChangedHandler: newPinConfirmInputChangedHandler,
    valueInputBlurHandler: newPinConfirmInputBlurHandler,
    enteredValueIsValid: newPinConfirmIsValid,
    hasError: newPinConfirmIsInvalid,
    reset: newPinConfirmInputReset,
  } = useInput((value) => value.trim().length === 4);

  let formIsValid = false;
  if (currentPinIsValid && newPinIsValid && newPinConfirmIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(transferActions.showSpinner());

    const data = await updateSettings(
      {
        pinCurrent: currentPin,
        pin: newPin,
        pinConfirm: newPinConfirm,
      },
      "pin",
      jwt
    );

    if (data.status === "success") {
      bckdrpCtx.onHideChangePin();
      dispatch(
        alertActions.setState({
          message: "Pin updated successfully!",
          status: data.status,
        })
      );
      dispatch(transferActions.hideSpinner());
    } else {
      dispatch(transferActions.hideSpinner());
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }

    currentPinInputReset();
    newPinInputReset();
    newPinConfirmInputReset();
  };

  const formClasses = bckdrpCtx.showChangePin
    ? `${classes.form} ${styles.add}`
    : `${classes.form} ${styles.remove}`;

  const currentPinClasses = currentPinIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const newPinClasses = newPinIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const newPinConfirmClasses = newPinConfirmIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={formClasses} onSubmit={submitHandler}>
      {showSpinner && <LoadSpinner />}
      <div className={classes.container}>
        <div className={currentPinClasses}>
          <label htmlFor="current-pin">Current Pin</label>
          <input
            type="number"
            value={currentPin}
            onChange={currentPinInputChangedHandler}
            onBlur={currentPinInputBlurHandler}
          />
        </div>
        <div className={newPinClasses}>
          <label htmlFor="new-pin">New Pin</label>
          <input
            type="number"
            value={newPin}
            onChange={newPinInputChangedHandler}
            onBlur={newPinInputBlurHandler}
          />
        </div>
        <div className={newPinConfirmClasses}>
          <label htmlFor="confirm-new-pin">Confirm New Pin</label>
          <input
            type="number"
            value={newPinConfirm}
            onChange={newPinConfirmInputChangedHandler}
            onBlur={newPinConfirmInputBlurHandler}
          />
        </div>
        <div className={classes.action}>
          <div className={classes.close} onClick={bckdrpCtx.onHideChangePin}>
            X
          </div>
          <button type="submit" disabled={!formIsValid}>
            Change Pin
          </button>
        </div>
      </div>
    </form>
  );
};

const PinForm = (props) => {
  const bckdrpCtx = useContext(BackdropContext);

  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");

  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onHide={bckdrpCtx.onHideChangePin} />,
        backdropEl
      )}
      {ReactDom.createPortal(<Overlay />, overlayEl)}
    </Fragment>
  );
};

export default PinForm;

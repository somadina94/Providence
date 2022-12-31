import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/userInput";
import { useCookies } from "react-cookie";

import classes from "./TransferSecurityForm.module.css";
import styles from "../UI/General.module.css";
import Backdrop from "./Backdrop";
import { transferActions } from "../../store.js/transfer-slice";
import { completeTransfer } from "../../api/api";
import LoadSpinner from "./LoadSpinner";
import { alertActions } from "../../store.js/alert-slice";

const Form = () => {
  const dispatch = useDispatch();
  const showSpinner = useSelector((state) => state.transferSlice.showSpinner);
  const showSecurity = useSelector((state) => state.transferSlice.showSecurity);
  const data = useSelector(
    (state) => state.transferSlice.transactions.userData
  );
  const amount = data.amount * 1;
  const transferData = useSelector((state) => state.transferSlice.transactions);
  const { jwt } = useCookies(["jwt"])[0];

  const {
    value: enteredToken,
    enteredValueIsValid: enteredTokenIsValid,
    hasError: enteredTokenIsInvalid,
    valueInputChangedHandler: tokenInputChangedHandler,
    valueInputBlurHandler: tokenInputBlurHandler,
    reset: resetTokenInput,
  } = useInput((value) => value.trim().length === 6);

  let formIsValid = false;
  if (enteredTokenIsValid) {
    formIsValid = true;
  }

  const hidePageHandler = () => {
    dispatch(transferActions.hideSecurityForm());
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(transferActions.showSpinner());
    const updatedTransferData = { ...transferData };
    updatedTransferData.token = enteredToken;

    const data = await completeTransfer(updatedTransferData, jwt);

    if (data.status === "success") {
      resetTokenInput();
      dispatch(transferActions.hideSpinner());
      dispatch(transferActions.hideSecurityForm());
      dispatch(
        alertActions.setState({ message: data.message, status: data.status })
      );
      dispatch(transferActions.showPrintPage());
    } else {
      resetTokenInput();
      dispatch(transferActions.hideSpinner());
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }
  };

  const verifyClasses = showSecurity
    ? `${classes.verify} ${styles.add}`
    : `${classes.verify} ${styles.remove}`;

  const groupClasses = enteredTokenIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <section className={verifyClasses}>
      {showSpinner && <LoadSpinner />}
      <div className={classes.data}>
        <h1>
          Review your Beneficiary data and enter the 6 digit transfer token sent
          to your email.
        </h1>
        <h2>
          <span>Bank name:</span>
          <span>{data.bankName}</span>
        </h2>
        <h2>
          <span>Beneficiary account name:</span>
          <span>{data.name}</span>
        </h2>
        <h2>
          <span>Transfer type:</span>
          <span>{data.transferType}</span>
        </h2>
        <h2>
          <span>Transaction type:</span>
          <span>{data.transactionType}</span>
        </h2>
        <h2>
          <span>Beneficiary account number:</span>
          <span>{data.account}</span>
        </h2>
        <h2>
          <span>Amount:</span>
          <span>€{amount.toFixed(2)}</span>
        </h2>
      </div>
      <form onSubmit={submitHandler}>
        <div className={groupClasses}>
          <label htmlFor="token">Enter your 6 digit security code</label>
          <input
            type="text"
            value={enteredToken}
            onChange={tokenInputChangedHandler}
            onBlur={tokenInputBlurHandler}
          />
          {enteredTokenIsInvalid && (
            <p className={classes["error-text"]}>
              Please enter your 6 digit code.
            </p>
          )}
        </div>
        <div className={classes.action}>
          <div className={classes.close} onClick={hidePageHandler}>
            X
          </div>
          <button type="submit" disabled={!formIsValid}>
            Proceed
          </button>
        </div>
      </form>
    </section>
  );
};

const TransferSecurityForm = () => {
  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, backdropEl)}
      {ReactDOM.createPortal(<Form />, overlayEl)}
    </Fragment>
  );
};

export default TransferSecurityForm;

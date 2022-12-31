import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/userInput";
import Cookies from "universal-cookie";

import classes from "./IntTransSecurityForm.module.css";
import styles from "../UI/General.module.css";
import Backdrop from "../UI/Backdrop";
import { transferActions } from "../../store.js/transfer-slice";
import { completeIntTransfer } from "../../api/api";
import LoadSpinner from "../UI/LoadSpinner";
import { alertActions } from "../../store.js/alert-slice";

const Form = () => {
  const dispatch = useDispatch();
  const showSpinner = useSelector((state) => state.transferSlice.showSpinner);
  const showIntConfirm = useSelector(
    (state) => state.transferSlice.showIntConfirm
  );
  const data = useSelector(
    (state) => state.transferSlice.transactions.receipientData
  );
  const amount = data.amount * 1;
  const transferData = useSelector((state) => state.transferSlice.transactions);
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");

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
    dispatch(transferActions.hideIntConfirmForm());
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(transferActions.showSpinner());
    const updatedTransferData = { ...transferData };
    updatedTransferData.token = enteredToken;

    const data = await completeIntTransfer(updatedTransferData, jwt);

    if (data.status === "success") {
      resetTokenInput();
      dispatch(transferActions.hideSpinner());
      dispatch(transferActions.hideIntConfirmForm());
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

  const verifyClasses = showIntConfirm
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
          <span>Bank name:</span>
          <span>{data.bankAddress}</span>
        </h2>
        <h2>
          <span>Bank name:</span>
          <span>{data.swiftCode}</span>
        </h2>
        <h2>
          <span>Beneficiary account name:</span>
          <span>{data.name}</span>
        </h2>
        <h2>
          <span>Beneficiary account name:</span>
          <span>{data.receipientAddress}</span>
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
        </div>
        <div className={classes.action}>
          <button type="submit" disabled={!formIsValid}>
            Proceed
          </button>
        </div>
        <button
          type="button"
          className={classes.close}
          onClick={hidePageHandler}
        >
          X
        </button>
      </form>
    </section>
  );
};

const IntTransSecurityForm = () => {
  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, backdropEl)}
      {ReactDOM.createPortal(<Form />, overlayEl)}
    </Fragment>
  );
};

export default IntTransSecurityForm;

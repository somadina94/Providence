import { Fragment, useContext } from "react";
import ReactDom from "react-dom";
import useInput from "../hooks/userInput";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import classes from "./LocalTransferForm.module.css";
import styles from "../UI/General.module.css";
import BackdropContext from "../store/backdrop-context";
import Backdrop from "../UI/Backdrop";
import { transferActions } from "../../store.js/transfer-slice";
import { sendSecurityCode } from "../../api/api";
import LoadSpinner from "../UI/LoadSpinner";
import { alertActions } from "../../store.js/alert-slice";

const Overlay = (props) => {
  const dispatch = useDispatch();
  const bckdrpCtx = useContext(BackdropContext);
  const showSpinner = useSelector((state) => state.transferSlice.showSpinner);
  const user = useSelector((state) => state.authSlice.user);
  const { jwt } = useCookies(["jwt"])[0];

  const {
    value: userAccount,
    valueInputChangedHandler: userAccountInputChangedHandler,
    valueInputBlurHandler: userAccountInputBlurHandler,
    enteredValueIsValid: userAccountIsValid,
    hasError: userAccountIsInvalid,
  } = useInput((value) => value !== "" && value !== "Choose account");

  const {
    value: transferType,
    valueInputChangedHandler: transferTypeInputChangedHandler,
    valueInputBlurHandler: transferTypeInputBlurHandler,
    enteredValueIsValid: transferTypeIsValid,
    hasError: transferTypeIsInvalid,
  } = useInput((value) => value !== "" && value !== "Transfer type");

  const {
    value: enteredBankName,
    enteredValueIsValid: enteredBankNameIsValid,
    valueInputChangedHandler: bankNameInputChangedHandler,
    valueInputBlurHandler: bankNameInputBlurHandler,
    hasError: enteredBankNameIsInvalid,
    reset: resetBankNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAccountName,
    enteredValueIsValid: enteredAccountNameIsValid,
    hasError: enteredAccountNameIsInvalid,
    valueInputChangedHandler: accountNameInputChangedHandler,
    valueInputBlurHandler: accountNameInputBlurHandler,
    reset: resetAccountNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAccountNumber,
    enteredValueIsValid: enteredAccountNumberIsValid,
    hasError: enteredAccountNumberIsInvalid,
    valueInputChangedHandler: accountNumberInputChangedHandler,
    valueInputBlurHandler: accountNumberInputBlurHandler,
    reset: resetAccountNumberInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAmount,
    enteredValueIsValid: enteredAmountIsValid,
    hasError: enteredAmountIsInvalid,
    valueInputChangedHandler: amountInputChangedHandler,
    valueInputBlurHandler: amountInputBlurHandler,
    reset: resetAmountInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    userAccountIsValid &&
    transferTypeIsValid &&
    enteredBankNameIsValid &&
    enteredAccountNameIsValid &&
    enteredAmountIsValid &&
    enteredAccountNumberIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(transferActions.showSpinner());

    const transactions = {
      token: "",
      userData: {
        transferType: transferType,
        bankName: enteredBankName,
        name: enteredAccountName,
        account: enteredAccountNumber,
        amount: enteredAmount,
        transactionType: "Debit",
        description: `ONB transfer to ${enteredAccountName}`,
        status: "Successful",
      },
      receipientData: {
        transferType: transferType,
        bankName: enteredBankName,
        name: enteredAccountName,
        account: enteredAccountNumber,
        amount: enteredAmount,
        transactionType: "Credit",
        description: `ONB transfer from ${enteredAccountName}`,
        status: "Successful",
      },
    };

    resetBankNameInput();
    resetAccountNameInput();
    resetAccountNumberInput();
    resetAmountInput();

    const data = await sendSecurityCode(jwt);

    if (data.status === "success") {
      dispatch(transferActions.transfer(transactions));
      dispatch(transferActions.hideSpinner());
      bckdrpCtx.onHideLocTransfer();
      dispatch(transferActions.showSecurityForm());
    } else {
      dispatch(transferActions.hideSpinner());
      bckdrpCtx.onHideLocTransfer();
      dispatch(
        alertActions.setState({ message: data.message, status: data.status })
      );
    }
  };

  const formClasses = bckdrpCtx.showLocTransfer
    ? `${classes.form} ${styles.add}`
    : `${classes.form} ${styles.remove}`;

  const userAccountClasses = userAccountIsInvalid
    ? `${classes["group-inner"]} ${classes.invalid}`
    : classes["group-inner"];

  const transferTypeClasses = transferTypeIsInvalid
    ? `${classes["group-inner"]} ${classes.invalid}`
    : classes["group-inner"];

  const bankNameClasses = enteredBankNameIsInvalid
    ? `${classes.group2} ${classes.invalid}`
    : classes.group2;

  const accountNameClasses = enteredAccountNameIsInvalid
    ? `${classes.group2} ${classes.invalid}`
    : classes.group2;

  const accountNumberClasses = enteredAccountNumberIsInvalid
    ? `${classes.group2} ${classes.invalid}`
    : classes.group2;

  const amountClasses = enteredAmountIsInvalid
    ? `${classes.group2} ${classes.invalid}`
    : classes.group2;

  return (
    <form className={formClasses} onSubmit={submitHandler}>
      {showSpinner && <LoadSpinner />}
      <h2>TRANSFER FUNDS</h2>
      <div className={classes.group}>
        <div className={userAccountClasses}>
          <label htmlFor="account">To be Debited Account</label>
          <select
            value={userAccount}
            onChange={userAccountInputChangedHandler}
            onBlur={userAccountInputBlurHandler}
          >
            <option>Choose account</option>
            <option>{user.accountNumber}</option>
          </select>
        </div>
        <div className={transferTypeClasses}>
          <label htmlFor="transfertype">Transfer Type</label>
          <select
            value={transferType}
            onChange={transferTypeInputChangedHandler}
            onBlur={transferTypeInputBlurHandler}
          >
            <option>Transfer type</option>
            <option>Local Transfer</option>
          </select>
        </div>
      </div>
      <h2 className={classes["bank-details"]}>BENEFICIARY BANK DETAILS</h2>
      <div className={classes.group}>
        <div className={bankNameClasses}>
          <label htmlFor="bankName">Beneficiary Bank Name</label>
          <input
            type="text"
            value={enteredBankName}
            onChange={bankNameInputChangedHandler}
            onBlur={bankNameInputBlurHandler}
          />
        </div>
        <div className={accountNameClasses}>
          <label htmlFor="name">Beneficiary Account Name</label>
          <input
            type="text"
            value={enteredAccountName}
            onChange={accountNameInputChangedHandler}
            onBlur={accountNameInputBlurHandler}
          />
        </div>
      </div>
      <div className={classes.group}>
        <div className={accountNumberClasses}>
          <label htmlFor="account-number">Beneficiary Account Number</label>
          <input
            type="text"
            value={enteredAccountNumber}
            onChange={accountNumberInputChangedHandler}
            onBlur={accountNumberInputBlurHandler}
          />
        </div>
        <div className={amountClasses}>
          <label htmlFor="amount">Amount €</label>
          <input
            type="number"
            onBlur={amountInputBlurHandler}
            value={enteredAmount}
            onChange={amountInputChangedHandler}
          />
        </div>
      </div>
      <div className={classes.action}>
        <div className={classes.close} onClick={bckdrpCtx.onHideLocTransfer}>
          X
        </div>
        <button type="submit" disabled={!formIsValid}>
          Proceed
        </button>
      </div>
    </form>
  );
};

const LocalTransferForm = (props) => {
  const bckdrpCtx = useContext(BackdropContext);

  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");

  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onHide={bckdrpCtx.onHideLocTransfer} />,
        backdropEl
      )}
      {ReactDom.createPortal(<Overlay user={props.user} />, overlayEl)}
    </Fragment>
  );
};

export default LocalTransferForm;

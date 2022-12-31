import { Fragment, useContext } from "react";
import ReactDom from "react-dom";
import useInput from "../hooks/userInput";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";

import classes from "./IntTransferForm.module.css";
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
  const bankAccount = useSelector(
    (state) => state.authSlice.user.accountNumber
  );
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");

  const {
    value: userAccount,
    enteredValueIsValid: userAccountIsValid,
    hasError: userAccountIsInvalid,
    valueInputChangedHandler: userAccountInputChangedHandler,
    valueInputBlurHandler: userAccountInputBlurHandler,
  } = useInput(
    (value) => value.trim() !== "" && value.trim() !== "Choose account"
  );

  const {
    value: transferType,
    enteredValueIsValid: transferTypeIsValid,
    hasError: transferTypeIsInvalid,
    valueInputChangedHandler: transferTypeInputChangedHandler,
    valueInputBlurHandler: transferTypeInputBlurHandler,
  } = useInput(
    (value) => value.trim() !== "" && value.trim() !== "Choose transfer type"
  );

  const {
    value: enteredBankName,
    enteredValueIsValid: enteredBankNameIsValid,
    hasError: enteredBankNameIsInvalid,
    valueInputChangedHandler: enteredBankNameInputChangedHandler,
    valueInputBlurHandler: enteredBankNameInputBlurHandler,
    reset: resetEnteredBankNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredSwiftCode,
    enteredValueIsValid: enteredSwiftCodeIsValid,
    hasError: enteredSwiftCodeIsInvalid,
    valueInputChangedHandler: enteredSwiftCodeInputChangedHandler,
    valueInputBlurHandler: enteredSwiftCodeInputBlurHandler,
    reset: resetEnteredSwiftCodeInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredBankAddress,
    enteredValueIsValid: enteredBankAddressIsValid,
    hasError: enteredBankAddressIsInvalid,
    valueInputChangedHandler: enteredBankAddressInputChangedHandler,
    valueInputBlurHandler: enteredBankAddressInputBlurHandler,
    reset: resetEnteredBankAddressInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredBeneficiaryName,
    enteredValueIsValid: enteredBeneficiaryNameIsValid,
    hasError: enteredBeneficiaryNameIsInvalid,
    valueInputChangedHandler: enteredBeneficiaryNameInputChangedHandler,
    valueInputBlurHandler: enteredBeneficiaryNameInputBlurHandler,
    reset: resetEnteredBeneficiaryNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredIBAN,
    enteredValueIsValid: enteredIBANIsValid,
    hasError: enteredIBANIsInvalid,
    valueInputChangedHandler: enteredIBANInputChangedHandler,
    valueInputBlurHandler: enteredIBANInputBlurHandler,
    reset: resetEnteredIBANInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredBeneficiaryAddress,
    enteredValueIsValid: enteredBeneficiaryAddressIsValid,
    hasError: enteredBeneficiaryAddressIsInvalid,
    valueInputChangedHandler: enteredBeneficiaryAddressInputChangedHandler,
    valueInputBlurHandler: enteredBeneficiaryAddressInputBlurHandler,
    reset: resetEnteredBeneficiaryAddressInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAmount,
    enteredValueIsValid: enteredAmountIsValid,
    hasError: enteredAmountIsInvalid,
    valueInputChangedHandler: enteredAmountInputChangedHandler,
    valueInputBlurHandler: enteredAmountInputBlurHandler,
    reset: resetEnteredAmountInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    userAccountIsValid &&
    transferTypeIsValid &&
    enteredBankNameIsValid &&
    enteredSwiftCodeIsValid &&
    enteredBankAddressIsValid &&
    enteredBeneficiaryNameIsValid &&
    enteredIBANIsValid &&
    enteredBeneficiaryAddressIsValid &&
    enteredAmountIsValid
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
        name: enteredBeneficiaryName,
        account: enteredIBAN.trim(),
        amount: enteredAmount,
        transactionType: "Debit",
        description: `ONB transfer to ${enteredBeneficiaryName}`,
        status: "Successful",
      },
      receipientData: {
        transferType: transferType,
        bankName: enteredBankName,
        name: enteredBeneficiaryName,
        account: enteredIBAN.trim(),
        amount: enteredAmount,
        transactionType: "Credit",
        description: `ONB transfer from ${enteredBeneficiaryName}`,
        swiftCode: enteredSwiftCode,
        bankAddress: enteredBankAddress,
        receipientAddress: enteredBeneficiaryAddress,
        status: "Successful",
      },
    };

    resetEnteredBankNameInput();
    resetEnteredSwiftCodeInput();
    resetEnteredBankAddressInput();
    resetEnteredBeneficiaryNameInput();
    resetEnteredIBANInput();
    resetEnteredBeneficiaryAddressInput();
    resetEnteredAmountInput();

    const data = await sendSecurityCode(jwt);

    if (data.status === "success") {
      dispatch(transferActions.transfer(transactions));
      dispatch(transferActions.hideSpinner());
      bckdrpCtx.onHideIntTransfer();
      dispatch(transferActions.showIntConfirmForm());
    } else {
      dispatch(transferActions.hideSpinner());
      dispatch(
        alertActions.setState({ message: data.message, status: data.status })
      );
    }
  };

  const formClasses = bckdrpCtx.showIntTransfer
    ? `${classes.form} ${styles.add}`
    : `${classes.form} ${styles.remove}`;

  const userAccountClasses = userAccountIsInvalid
    ? `${classes["group-inner"]} ${classes.invalid}`
    : classes["group-inner"];

  const transferTypeClasses = transferTypeIsInvalid
    ? `${classes["group-inner"]} ${classes.invalid}`
    : classes["group-inner"];

  const bankNameClasses = enteredBankNameIsInvalid
    ? `${classes["group-bank-details"]} ${classes.invalid}`
    : classes["group-bank-details"];

  const swiftCodeClasses = enteredSwiftCodeIsInvalid
    ? `${classes["group-bank-details"]} ${classes.invalid}`
    : classes["group-bank-details"];

  const bankAddressClasses = enteredBankAddressIsInvalid
    ? `${classes["group-bank-details"]} ${classes.invalid}`
    : classes["group-bank-details"];

  const beneficiaryNameClasses = enteredBeneficiaryNameIsInvalid
    ? `${classes["group-bank-details"]} ${classes.invalid}`
    : classes["group-bank-details"];

  const IBANClasses = enteredIBANIsInvalid
    ? `${classes["group-bank-details"]} ${classes.invalid}`
    : classes["group-bank-details"];

  const beneficiaryAddressClasses = enteredBeneficiaryAddressIsInvalid
    ? `${classes["group-bank-details"]} ${classes.invalid}`
    : classes["group-bank-details"];

  const amountClasses = enteredAmountIsInvalid
    ? `${classes.amount} ${classes.invalid}`
    : classes.amount;

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
            <option>{bankAccount}</option>
          </select>
          {userAccountIsInvalid && (
            <p className={classes["error-text"]}>This field is required</p>
          )}
        </div>
        <div className={transferTypeClasses}>
          <label htmlFor="account-type">Transfer Type</label>
          <select
            value={transferType}
            onChange={transferTypeInputChangedHandler}
            onBlur={transferTypeInputBlurHandler}
          >
            <option>Choose transfer type</option>
            <option>FX Transfer to Another Bank</option>
          </select>
          {transferTypeIsInvalid && (
            <p className={classes["error-text"]}>This field is required</p>
          )}
        </div>
      </div>
      <h2 className={classes["bank-details"]}>FX BENEFICIARY BANK DETAILS</h2>
      <div className={classes.group}>
        <div className={bankNameClasses}>
          <label htmlFor="bank-name">Bank Name</label>
          <input
            type="text"
            value={enteredBankName}
            onChange={enteredBankNameInputChangedHandler}
            onBlur={enteredBankNameInputBlurHandler}
          />
          {enteredBankNameIsInvalid && (
            <p className={classes["error-text"]}>This field is required</p>
          )}
        </div>
        <div className={swiftCodeClasses}>
          <label htmlFor="swift-code">Swift Code/Routing Number</label>
          <input
            type="text"
            value={enteredSwiftCode}
            onChange={enteredSwiftCodeInputChangedHandler}
            onBlur={enteredSwiftCodeInputBlurHandler}
          />
          {enteredSwiftCodeIsInvalid && (
            <p className={classes["error-text"]}>This field is required</p>
          )}
        </div>
      </div>
      <div className={bankAddressClasses}>
        <label htmlFor="bank-address">Bank Address</label>
        <input
          type="text"
          value={enteredBankAddress}
          onChange={enteredBankAddressInputChangedHandler}
          onBlur={enteredBankAddressInputBlurHandler}
        />
        {enteredBankAddressIsInvalid && (
          <p className={classes["error-text"]}>This field is required</p>
        )}
      </div>
      <h2>FX BENEFICIARY DETAILS</h2>
      <div className={classes.group}>
        <div className={beneficiaryNameClasses}>
          <label htmlFor="name">Beneficiary Name</label>
          <input
            type="text"
            value={enteredBeneficiaryName}
            onChange={enteredBeneficiaryNameInputChangedHandler}
            onBlur={enteredBeneficiaryNameInputBlurHandler}
          />
          {enteredBeneficiaryNameIsInvalid && (
            <p className={classes["error-text"]}>This field is required</p>
          )}
        </div>
        <div className={IBANClasses}>
          <label htmlFor="account-number">Beneficiary IBAN</label>
          <input
            type="text"
            value={enteredIBAN}
            onChange={enteredIBANInputChangedHandler}
            onBlur={enteredIBANInputBlurHandler}
          />
          {enteredIBANIsInvalid && (
            <p className={classes["error-text"]}>This field is required</p>
          )}
        </div>
      </div>
      <div className={beneficiaryAddressClasses}>
        <label htmlFor="beneficiary-address">Beneficiary Address</label>
        <input
          type="text"
          value={enteredBeneficiaryAddress}
          onChange={enteredBeneficiaryAddressInputChangedHandler}
          onBlur={enteredBeneficiaryAddressInputBlurHandler}
        />
        {enteredBeneficiaryAddressIsInvalid && (
          <p className={classes["error-text"]}>This field is required</p>
        )}
      </div>
      <div className={amountClasses}>
        <label htmlFor="amount">Amount €</label>
        <input
          type="text"
          value={enteredAmount}
          onChange={enteredAmountInputChangedHandler}
          onBlur={enteredAmountInputBlurHandler}
        />
        {enteredAmountIsInvalid && (
          <p className={classes["error-text"]}>This field is required</p>
        )}
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Proceed
        </button>
      </div>
      <button
        type="button"
        className={classes.close}
        onClick={bckdrpCtx.onHideIntTransfer}
      >
        X
      </button>
    </form>
  );
};

const IntTransferForm = (props) => {
  const bckdrpCtx = useContext(BackdropContext);
  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");

  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onHide={bckdrpCtx.onHideIntTransfer} />,
        backdropEl
      )}
      {ReactDom.createPortal(<Overlay user={props.user} />, overlayEl)}
    </Fragment>
  );
};

export default IntTransferForm;

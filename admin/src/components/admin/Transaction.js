import { Fragment, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Transaction.module.css";
import { deleteTransaction } from "../../api/api";
import { alertActions } from "../../store/alert-slice";
import { spinnerActions } from "../../store/spinner-slice";

import { reverseTransaction } from "../../api/api";

const Transaction = (props) => {
  const [deleted, setDeleted] = useState();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const idRef = useRef();
  const { jwt } = useCookies(["jwt"])[0];

  const reverseHandler = async () => {
    dispatch(spinnerActions.showSpinner());
    const transData = {
      transferType: props.transferType,
      transactionType: "Credit",
      bankName: props.bankName,
      name: props.receipient,
      account: props.account,
      amount: props.amount,
      status: "Reversed",
      description: `ONB transfer to ${props.receipient} reversed`,
      date: Date.now(),
    };

    const data = await reverseTransaction(transData, userId, jwt);

    if (data.status === "success") {
      dispatch(
        alertActions.setState({
          message: "Transaction reversed successfully",
          status: "success",
        })
      );
    } else {
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }
    dispatch(spinnerActions.hideSpinner());
  };

  const deleteHandler = async () => {
    dispatch(spinnerActions.showSpinner());
    const transId = idRef.current.textContent;

    const data = await deleteTransaction(transId, userId, jwt);
    if (data === "") {
      dispatch(
        alertActions.setState({
          message: "Transaction deleted",
          status: "success",
        })
      );
    } else {
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }
    setDeleted(true);
    dispatch(spinnerActions.hideSpinner());
  };

  return (
    <Fragment>
      {!deleted && (
        <div className={classes.group}>
          <div className={classes.content}>
            <span className={classes.title}>ID:</span>
            <span className={classes.value} ref={idRef}>
              {props.id}
            </span>
          </div>
          <div className={classes.content}>
            <span className={classes.title}>Transfer type:</span>
            <span className={classes.value}>{props.transferType}</span>
          </div>
          <div className={classes.content}>
            <span className={classes.title}>Transaction type:</span>
            <span className={classes.value}>{props.transactionType}</span>
          </div>
          <div className={classes.content}>
            <span className={classes.title}>Bank name:</span>
            <span className={classes.value}>{props.bankName}</span>
          </div>
          <div className={classes.content}>
            <span className={classes.title}>Receipient:</span>
            <span className={classes.value}>{props.receipient}</span>
          </div>
          <div className={classes.content}>
            <span className={classes.title}>Account:</span>
            <span className={classes.value}>{props.account}</span>
          </div>
          <div className={classes.content}>
            <span className={classes.title}>Amount:</span>
            <span className={classes.value}>€{props.amount}</span>
          </div>
          <div className={classes.content}>
            <span className={classes.title}>status:</span>
            <span className={classes.value}>{props.status}</span>
          </div>
          <div className={classes.action}>
            <button type="button" onClick={deleteHandler}>
              Delete
            </button>
            <button type="button" onClick={reverseHandler}>
              Reverse
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Transaction;

import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";

import classes from "./Transactions.module.css";
import Transaction from "./Transaction";
import { findUserById } from "../../api/api";

import { alertActions } from "../../store/alert-slice";
import { spinnerActions } from "../../store/spinner-slice";
import { addTransaction } from "../../api/api";

const Transactions = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const users = useSelector((state) => state.admin.users);

  const { jwt } = useCookies(["jwt"])[0];

  const bankNameInputRef = useRef();
  const transactionTypeInputRef = useRef();
  const transferTypeInputRef = useRef();
  const descriptionInputRef = useRef();
  const nameInputRef = useRef();
  const accountInputRef = useRef();
  const statusInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const [user] = users.filter((user) => user._id === userId);
  const { transactions } = user;

  const addTransactionHandler = async (e) => {
    e.preventDefault();
    dispatch(spinnerActions.showSpinner());

    const transData = {
      name: nameInputRef.current.value,
      bankName: bankNameInputRef.current.value,
      description: descriptionInputRef.current.value,
      account: accountInputRef.current.value,
      amount: amountInputRef.current.value,
      date: dateInputRef.current.value,
      transferType: transferTypeInputRef.current.value,
      transactionType: transactionTypeInputRef.current.value,
      status: statusInputRef.current.value,
    };

    const data = await addTransaction(transData, userId, jwt);

    if (data.status === "success") {
      dispatch(
        alertActions.setState({ message: data.message, status: data.status })
      );
    } else {
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }

    dispatch(spinnerActions.hideSpinner());
  };

  return (
    <section className={classes.transactions}>
      <form className={classes.form} onSubmit={addTransactionHandler}>
        <h2>Add a new transaction</h2>
        <div className={classes.group}>
          <label>Bank name</label>
          <input type="text" ref={bankNameInputRef} />
        </div>
        <div className={classes.group}>
          <label>Name</label>
          <input type="text" ref={nameInputRef} />
        </div>
        <div className={classes.group}>
          <label>Account</label>
          <input type="number" ref={accountInputRef} />
        </div>
        <div className={classes.group}>
          <label>Description</label>
          <input type="text" ref={descriptionInputRef} />
        </div>
        <div className={classes.group}>
          <label>Date</label>
          <input type="date" ref={dateInputRef} />
        </div>
        <div className={classes.group}>
          <label>Transfer type</label>
          <select ref={transferTypeInputRef}>
            <option>Choose type</option>
            <option>Local transfer</option>
            <option>International transfer</option>
          </select>
        </div>
        <div className={classes.group}>
          <label>Transaction type</label>
          <select ref={transactionTypeInputRef}>
            <option>Choose type</option>
            <option>debit</option>
            <option>credit</option>
          </select>
        </div>
        <div className={classes.group}>
          <label>Status</label>
          <select ref={statusInputRef}>
            <option>Choose status</option>
            <option>Successful</option>
            <option>Reversed</option>
          </select>
        </div>
        <div className={classes.group}>
          <label>Amount</label>
          <input type="number" ref={amountInputRef} />
        </div>
        <div className={classes.action}>
          <button type="submit">Add</button>
        </div>
      </form>
      {transactions.map((data) => (
        <Transaction
          key={data._id}
          id={data._id}
          transferType={data.transferType}
          transactionType={data.transactionType}
          bankName={data.bankName}
          receipient={data.name}
          account={data.account}
          amount={data.amount}
          status={data.status}
        />
      ))}
    </section>
  );
};

export default Transactions;

export const loader = ({ params }) => {
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  return findUserById(params.userId, jwt);
};

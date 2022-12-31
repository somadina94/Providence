import { useSelector } from "react-redux";

import classes from "./HistoryList.module.css";
import TransationsList from "../main/TransactionsList";

const HistoryList = (props) => {
  const userData = useSelector((state) => state.authSlice.user);
  const trans = userData.transactions;

  const transs = Array.from(trans);

  const transactions = transs.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  if (transactions.length === 0) {
    return (
      <div className={classes.centered}>
        You have not received nor made any transactions so far.
      </div>
    );
  }

  return (
    <section>
      <h2 className={classes.header}>YOUR TRANSACTIONS</h2>
      <table className={classes.container}>
        <thead>
          <tr>
            <th>DATE</th>
            <th>TYPE</th>
            <th>DESCRIPTION</th>
            <th>ACCOUNT</th>
            <th>STATUS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((data) => (
            <TransationsList
              key={data._id}
              date={data.date}
              transferType={data.transactionType}
              description={data.description}
              receipient={data.account}
              status={data.status}
              amount={data.amount}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default HistoryList;

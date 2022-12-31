import classes from "./TransactionsList.module.css";

const TransationsList = (props) => {
  const date = new Date(props.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let amount = +props.amount;
  amount = amount.toFixed(2);

  return (
    <tr className={classes.list}>
      <td>{date}</td>
      <td>{props.transferType}</td>
      <td>{props.description}</td>
      <td>{props.receipient}</td>
      <td>{props.status}</td>
      <td>€{amount}</td>
    </tr>
  );
};

export default TransationsList;

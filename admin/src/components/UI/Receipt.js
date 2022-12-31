import { forwardRef } from "react";
import { useSelector } from "react-redux";

import classes from "./Receipt.module.css";
import logo from "../../images/logo.png";

const Receipt = forwardRef((props, ref) => {
  const receiptData = useSelector(
    (state) => state.transferSlice.transactions.userData
  );
  const user = useSelector((state) => state.authSlice.user);
  const amount = receiptData.amount * 1;

  return (
    <main className={classes.receipt} ref={ref}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={classes.title}>
        <h2>Online Banking</h2>
        <p>Transaction Receipt</p>
      </div>
      <div className={classes.details}>
        <p>Payer</p>
        <div className={classes.right}>
          <h3>{user.name.toUpperCase()}</h3>
          <p>{user.accountNumber}</p>
          <p>Providence Bank Plc</p>
        </div>
      </div>
      <div className={classes.details}>
        <p>Reciever</p>
        <div className={classes.right}>
          <h3>{receiptData.name.toUpperCase()}</h3>
          <p>{receiptData.account}</p>
          <p>{receiptData.bankName}</p>
        </div>
      </div>
      <div className={classes.details}>
        <p>Transaction</p>
        <div className={classes.right}>
          <p>€{amount.toFixed(2)}</p>
          <p>{receiptData.transferType.toUpperCase()}</p>
          <p>{new Date(Date.now()).toLocaleString()}</p>
        </div>
      </div>
      <div className={classes.details}>
        <p>Narration</p>
        <h4>{receiptData.description.toUpperCase()}</h4>
      </div>
      <div className={classes.details}>
        <p>Reference</p>
        <div className={classes.right}>
          <p>
            ONB
            {Math.floor(
              Math.random() * (30000000000000 - 20000000000000 + 1) +
                20000000000000
            )}
          </p>
          <p>{receiptData.status.toUpperCase()}</p>
        </div>
      </div>
      <h4 className={classes.conclusion}>
        This is an electronic receipt of a transaction that does not require an
        signature. The authenticity of this transaction can be confirmed with
        the bank.
        <br />
        For any other assistance, kindly email Providence Serve on
        info@prvbm.com.
      </h4>
    </main>
  );
});

export default Receipt;

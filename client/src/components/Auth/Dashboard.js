import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import sideImage from "../../images/dashboard.jpg";
import sideImage2 from "../../images/dashboard2.jpg";
import Card from "../UI/Card";
import classes from "./Dashboard.module.css";

const Dashboard = (props) => {
  const userData = useSelector((state) => state.authSlice.user);
  const balance = userData.balance.toFixed(2);

  return (
    <section className={classes.container}>
      <div className={classes.imgDiv}>
        <img src={sideImage} alt="online banking with phone" />
      </div>
      <div className={classes.dashboard}>
        <Card>
          <div className={classes["account-title"]}>
            <h2>PREMIER CURRENT ACCOUNT</h2>
            <h2>{userData.accountNumber}</h2>
          </div>
          <h2 className={classes.name}>{userData.name.toUpperCase()}</h2>
          <div className={classes.info}>
            <div className={classes["info-flex"]}>
              <div>
                <h3>AVAILABLE BALANCE</h3>
                <h1 className={classes.balance}>€{balance}</h1>
              </div>
              <Link to="/account/transaction-history">
                View transaction history &rarr;
              </Link>
            </div>
            <div className={classes["info-flex"]}>
              <div>
                <h3>TOTAL BALANCE</h3>
                <h2 className={classes.balance}>€{balance}</h2>
              </div>
              <div>
                <h3>STATUS</h3>
                <h1>{userData.status.toUpperCase()}</h1>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className={classes.imgDiv}>
        <img src={sideImage2} alt="Euros" />
      </div>
    </section>
  );
};

export default Dashboard;

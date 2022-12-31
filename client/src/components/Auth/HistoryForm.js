import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./HistoryForm.module.css";

const HistoryForm = (props) => {
  const userData = useSelector((state) => state.authSlice.user);

  return (
    <form className={classes.form}>
      <div className={classes["group-date"]}>
        <Card>
          <input id="start-date" type="date" />
        </Card>
        <Card>
          <input id="end-date" type="date" />
        </Card>
      </div>
      <Card>
        <select>
          <option>{userData.accountNumber}</option>
        </select>
      </Card>
      <Card>
        <input type="text" placeholder="account name" />
      </Card>
      <Card>
        <button type="button">Search</button>
      </Card>
    </form>
  );
};

export default HistoryForm;

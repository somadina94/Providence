import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import classes from "./UserDetails.module.css";
import { alertActions } from "../../store/alert-slice";
import { spinnerActions } from "../../store/spinner-slice";
import { updateUserByAdmin } from "../../api/api";

const UserDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const users = useSelector((state) => state.admin.users);
  const { jwt } = useCookies(["jwt"])[0];
  const [user] = users.filter((user) => user._id === params.userId);

  const nameInputRef = useRef();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const accountInputRef = useRef();
  const balanceInputRef = useRef();
  const addressInputRef = useRef();
  const statusInputRef = useRef();
  const roleInputRef = useRef();
  const phoneInputRef = useRef();
  const dateOfBirthInputRef = useRef();
  const securityQuestionInputRef = useRef();
  const securityAnswerInputRef = useRef();
  const activeStatusInputRef = useRef();

  const curr = new Date(user.dateOfBirth);
  curr.setDate(curr.getDate());
  const date = curr.toISOString().substring(0, 10);

  const updateHandler = async (e) => {
    e.preventDefault();
    dispatch(spinnerActions.showSpinner());

    const form = new FormData();
    form.append("name", nameInputRef.current.value);
    form.append("username", usernameInputRef.current.value);
    form.append("email", emailInputRef.current.value);
    form.append("accountNumber", accountInputRef.current.value);
    form.append("balance", balanceInputRef.current.value);
    form.append("address", addressInputRef.current.value);
    form.append("status", statusInputRef.current.value);
    form.append("role", roleInputRef.current.value);
    form.append("phone", phoneInputRef.current.value);
    form.append("dateOfBirth", dateOfBirthInputRef.current.value);
    form.append("securityQuestion", securityQuestionInputRef.current.value);
    form.append("securityAnswer", securityAnswerInputRef.current.value);
    form.append("active", activeStatusInputRef.current.value);

    const data = await updateUserByAdmin(form, params.userId, jwt);

    if (data.status === "success") {
      dispatch(
        alertActions.setState({
          message: "Account updated succesfully!",
          status: data.status,
        })
      );
    } else {
      dispatch(
        alertActions.setState({ message: data.message, status: "error" })
      );
    }
    dispatch(spinnerActions.hideSpinner());
  };

  return (
    <form className={classes.details} onSubmit={updateHandler}>
      <div className={classes.group}>
        <label>Account name</label>
        <input type="text" defaultValue={user.name} ref={nameInputRef} />
      </div>
      <div className={classes.group}>
        <label>Username</label>
        <input
          type="text"
          defaultValue={user.username}
          ref={usernameInputRef}
        />
      </div>
      <div className={classes.group}>
        <label>Email</label>
        <input type="text" defaultValue={user.email} ref={emailInputRef} />
      </div>
      <div className={classes.group}>
        <label>Account number</label>
        <input
          type="text"
          defaultValue={user.accountNumber}
          ref={accountInputRef}
        />
      </div>
      <div className={classes.group}>
        <label>Account balance</label>
        <input type="text" defaultValue={user.balance} ref={balanceInputRef} />
      </div>
      <div className={classes.group}>
        <label>Account address</label>
        <input type="text" defaultValue={user.address} ref={addressInputRef} />
      </div>
      <div className={classes.group}>
        <label>Account status</label>
        <select defaultValue={user.status} ref={statusInputRef}>
          <option>Choose status</option>
          <option>active</option>
          <option>inactive</option>
        </select>
      </div>
      <div className={classes.group}>
        <label>Account role</label>
        <select defaultValue={user.role} ref={roleInputRef}>
          <option>Choose role</option>
          <option>user</option>
          <option>admin</option>
        </select>
      </div>
      <div className={classes.group}>
        <label>Account phone number</label>
        <input type="text" defaultValue={user.phone} ref={phoneInputRef} />
      </div>
      <div className={classes.group}>
        <label>Account date of birth</label>
        <input type="date" defaultValue={date} ref={dateOfBirthInputRef} />
      </div>
      <div className={classes.group}>
        <label>Security question</label>
        <select
          defaultValue={user.securityQuestion}
          ref={securityQuestionInputRef}
        >
          <option>Choose question</option>
          <option>What is the name of your favorite pet?</option>
          <option>Which city did your parents meet?</option>
          <option>What is the name of your favorite food?</option>
          <option>What is the name of your favorite movie?</option>
        </select>
      </div>
      <div className={classes.group}>
        <label>Security answer</label>
        <input
          type="text"
          defaultValue={user.securityAnswer}
          ref={securityAnswerInputRef}
        />
      </div>
      <div className={classes.group}>
        <label>Account active status</label>
        <select defaultValue={user.active} ref={activeStatusInputRef}>
          <option>Choose account status</option>
          <option>true</option>
          <option>false</option>
        </select>
      </div>
      <div className={classes.action}>
        <button type="submit">Update</button>
      </div>
    </form>
  );
};
export default UserDetails;

import { useRef, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import classes from "./Create.module.css";
import { spinnerActions } from "../../store/spinner-slice";
import { alertActions } from "../../store/alert-slice";
import { createNewAccount } from "../../api/api";

const Create = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { jwt } = useCookies(["jwt"])[0];

  const nameInputRef = useRef();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const balanceInputRef = useRef();
  const addressInputRef = useRef();
  const statusInputRef = useRef();
  const roleInputRef = useRef();
  const phoneInputRef = useRef();
  const dateOfBirthInputRef = useRef();
  const securityQuestionInputRef = useRef();
  const securityAnswerInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(spinnerActions.showSpinner());

    const form = new FormData();
    form.append("name", nameInputRef.current.value);
    form.append("username", usernameInputRef.current.value);
    form.append("email", emailInputRef.current.value);
    form.append("balance", balanceInputRef.current.value);
    form.append("address", addressInputRef.current.value);
    form.append("status", statusInputRef.current.value);
    form.append("role", roleInputRef.current.value);
    form.append("phone", phoneInputRef.current.value);
    form.append("dateOfBirth", dateOfBirthInputRef.current.value);
    form.append("securityQuestion", securityQuestionInputRef.current.value);
    form.append("securityAnswer", securityAnswerInputRef.current.value);

    const data = await createNewAccount(form, jwt);

    if (data.status === "success") {
      dispatch(
        alertActions.setState({
          message: `${data.data.user.name} successfully created!`,
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

  return (
    <form className={classes.details} onSubmit={submitHandler} ref={ref}>
      <div className={classes.group}>
        <label>Account name</label>
        <input type="text" ref={nameInputRef} />
      </div>
      <div className={classes.group}>
        <label>Username</label>
        <input type="text" ref={usernameInputRef} />
      </div>
      <div className={classes.group}>
        <label>Email</label>
        <input type="text" ref={emailInputRef} />
      </div>
      <div className={classes.group}>
        <label>Account balance</label>
        <input type="text" ref={balanceInputRef} />
      </div>
      {/* <div className={classes.group}>
        <label>Account pin</label>
        <input type="text" ref={pinInputRef} />
      </div>
      <div className={classes.group}>
        <label>Account Pin Confirm</label>
        <input type="text" ref={pinConfirmInputRef} />
      </div> */}
      <div className={classes.group}>
        <label>Account address</label>
        <input type="text" ref={addressInputRef} />
      </div>
      <div className={classes.group}>
        <label>Account status</label>
        <select ref={statusInputRef}>
          <option>Choose status</option>
          <option>active</option>
          <option>inactive</option>
        </select>
      </div>
      <div className={classes.group}>
        <label>Account role</label>
        <select ref={roleInputRef}>
          <option>Choose role</option>
          <option>user</option>
          <option>admin</option>
        </select>
      </div>
      <div className={classes.group}>
        <label>Account phone number</label>
        <input type="text" ref={phoneInputRef} />
      </div>
      <div className={classes.group}>
        <label>Account date of birth</label>
        <input type="date" ref={dateOfBirthInputRef} />
      </div>
      <div className={classes.group}>
        <label>Security question</label>
        <select ref={securityQuestionInputRef}>
          <option>Choose question</option>
          <option>What is the name of your favorite pet?</option>
          <option>Which city did your parents meet?</option>
          <option>What is the name of your favorite food?</option>
          <option>What is the name of your favorite movie?</option>
        </select>
      </div>
      <div className={classes.group}>
        <label>Security answer</label>
        <input type="text" ref={securityAnswerInputRef} />
      </div>
      {/* <div className={classes.group}>
        <label>Photo</label>
        <input type="file" ref={photoInputRef} />
      </div> */}
      <div className={classes.action}>
        <button type="submit">Create</button>
      </div>
    </form>
  );
});

export default Create;

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useDispatch } from "react-redux";

import classes from "./ContactUs.module.css";
import { alertActions } from "../../store.js/alert-slice";

const ContactUs = () => {
  const dispatch = useDispatch();

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zqz9ybr",
        "template_w3c2ub6",
        form.current,
        "ZOIyDhiSMCejlYNIf"
      )
      .then(
        (result) => {
          dispatch(
            alertActions.setState({
              message: "Your email has been sent successfully",
              status: "success",
            })
          );
        },
        (error) => {
          dispatch(
            alertActions.setState({
              message:
                "There was an error sending your email, please try again later or copy our email and email us direct from your mailbox",
              status: "error",
            })
          );
        }
      );

    e.target.reset();
  };

  return (
    <form className={classes.form} ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" className={classes.input} />
      <label>Email</label>
      <input type="email" name="email" className={classes.input} />
      <label>Message</label>
      <textarea name="message" className={classes.textarea} />
      <button type="submit" value="Send">
        Send email
      </button>
    </form>
  );
};

export default ContactUs;

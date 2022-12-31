import { useRouteError } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "universal-cookie";

import classes from "./Error.module.css";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import { alertActions } from "../store.js/alert-slice";
import { authActions } from "../store.js/auth-slice";

const Error = () => {
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  const data = useRouteError();
  const message = data.response.data.message;

  useEffect(() => {
    if (jwt) {
      dispatch(authActions.refreshUserErrorPage());
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    dispatch(alertActions.setState({ message: message, status: "error" }));
  }, [dispatch, message]);

  return (
    <section>
      <Header />
      <main className={classes.error}>
        <p>{message}</p>
      </main>
      <Footer />
    </section>
  );
};

export default Error;

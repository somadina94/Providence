import { Fragment } from "react";

import classes from "./TinySpinner.module.css";
import spinner from "../../images/spinner.gif";

const Backdrop = () => {
  return <section className={classes.backdrop}></section>;
};

const SpinnerDiv = () => {
  return (
    <div className={classes.spinner}>
      <img src={spinner} alt="load-spinner" />
    </div>
  );
};

const TinySpinner = () => {
  return (
    <Fragment>
      <Backdrop />
      <SpinnerDiv />
    </Fragment>
  );
};

export default TinySpinner;

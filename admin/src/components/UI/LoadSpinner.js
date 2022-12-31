import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./LoadSpinner.module.css";
import spinner from "../../images/spinner.gif";
import BackdropSpinner from "./BackdropSpinner";

const SpinnerDiv = () => {
  return (
    <div className={classes.spinner}>
      <img src={spinner} alt="load-spinner" />
    </div>
  );
};

const LoadSpinner = () => {
  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackdropSpinner />, backdropEl)}
      {ReactDOM.createPortal(<SpinnerDiv />, overlayEl)}
    </Fragment>
  );
};

export default LoadSpinner;

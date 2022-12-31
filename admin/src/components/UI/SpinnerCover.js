import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./SpinnerCover.module.css";
import spinner from "../../images/spinner.gif";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const Overlay = () => {
  return (
    <div className={classes.spinner}>
      <img src={spinner} alt="load-spinner" />
    </div>
  );
};

const SpinnerCover = () => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, backdropRoot)}
      {ReactDOM.createPortal(<Overlay />, overlayRoot)}
    </Fragment>
  );
};

export default SpinnerCover;

import { Fragment, useContext } from "react";
import ReactDom from "react-dom";

import BackdropSpinner from "./BackdropSpinner";
import classes from "./Alert.module.css";
import BackdropContext from "../store/backdrop-context";

const Success = (props) => {
  const bckdrpCtx = useContext(BackdropContext);
  return (
    <div className={classes.success}>
      <p>Transaction sucessful!</p>
      <div className={classes.close} onClick={bckdrpCtx.onHideSuccess}>
        X
      </div>
    </div>
  );
};

const AlertSuccess = (props) => {
  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");

  return (
    <Fragment>
      {ReactDom.createPortal(<BackdropSpinner />, backdropEl)}
      {ReactDom.createPortal(<Success />, overlayEl)}
    </Fragment>
  );
};

export default AlertSuccess;

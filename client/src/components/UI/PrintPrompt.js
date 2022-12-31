import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./PrintPrompt.module.css";
import styles from "../UI/General.module.css";
import Backdrop from "./Backdrop";
import Print from "./Print";
import { transferActions } from "../../store.js/transfer-slice";

const Overlay = () => {
  const dispatch = useDispatch();
  const showPrint = useSelector((state) => state.transferSlice.showPrint);
  const hidePrintPageHandler = () => {
    dispatch(transferActions.hidePrintPage());
  };

  const promptClasses = showPrint
    ? `${classes.prompt} ${styles.add}`
    : `${classes.prompt} ${styles.remove}`;

  return (
    <div className={promptClasses}>
      <p>Print your Transaction Receipt</p>
      <button className={classes.close} onClick={hidePrintPageHandler}>
        X
      </button>
      <div className={classes.print}>
        <Print />
      </div>
    </div>
  );
};

const PrintPrompt = () => {
  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, backdropEl)}
      {ReactDOM.createPortal(<Overlay />, overlayEl)}
    </Fragment>
  );
};

export default PrintPrompt;

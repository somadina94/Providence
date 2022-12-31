import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import classes from "./Print.module.css";
import Receipt from "./Receipt";

const Print = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div style={{ display: "none" }}>
        <Receipt ref={componentRef} />
      </div>
      <button className={classes.button} onClick={handlePrint}>
        Print receipt
      </button>
    </div>
  );
};

export default Print;

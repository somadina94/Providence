import { Fragment } from "react";
import Footer from "../main/Footer";
import Header from "../main/Header";
import classes from "./Help.module.css";

const Help = () => {
  return (
    <Fragment>
      <Header />
      <section className={classes.help}>
        <div className={classes.description}>
          <h2>Take the hassle out of buying insurance</h2>
          <p>
            Choose 3 or more different types of cover to protect the people and
            things you love, all under one policy. Pay just one monthly premium
            - and cancel anytime. It's insurance made easy, and exclusive to
            Providence customers registered for online banking.
          </p>
        </div>
        <div className={classes.description}>
          <h2>Money worries</h2>
          <p>
            If you've missed a bill or payment, or think you might, it's
            important you let us know as soon as possible. We may be able to
            offer you support and help you better manage your finances.
          </p>
        </div>
        <div className={classes.description}>
          <h2>Help with your mortgage payments</h2>
          <p>
            If you're worried about rising interest rates, here are some ways
            you might be able to reduce your mortgage payments.
          </p>
        </div>
        <div className={classes.description}>
          <h2>What does the rising cost of living mean for students?</h2>
          <p>
            Here, we share insights into how students have been affected by the
            rising cost of living, plus tips to help you manage your money and
            get support if you need it.
          </p>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Help;

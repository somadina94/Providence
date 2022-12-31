import { Fragment } from "react";
import Footer from "../main/Footer";
import Header from "../main/Header";
import classes from "./Investing.module.css";
import investing from "../../images/investing.jpeg";

const Investing = () => {
  return (
    <Fragment>
      <Header />
      <section className={classes.investing}>
        <div className={classes.heading}>
          <div className={classes.title}>
            <h2>Stocks & shares ISA</h2>
            <p>Get the most out of your investment with a tax-efficient ISA</p>
          </div>
          <div className={classes.image}>
            <img src={investing} alt="banking" />
          </div>
        </div>
        <div className={classes.description}>
          <h2>What's a stocks & shares ISA?</h2>
          <p>
            A stocks & shares ISA (Individual Savings Account) is an account
            that you can use for your investments. It's a tax-efficient way to
            grow your investments because, you can invest up to €20,000 in the
            current tax year, without paying any income tax or capital gains
            tax. The value of tax benefits will depend on your circumstances and
            tax rules may change in the future. Remember the value of
            investments can go down as well as up, so you may not get back what
            you invest.
          </p>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Investing;

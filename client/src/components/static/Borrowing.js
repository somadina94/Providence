import { Fragment } from "react";
import Footer from "../main/Footer";
import Header from "../main/Header";
import classes from "./Borrowing.module.css";
import borrowing from "../../images/borrowing.jpg";

const Borrowing = () => {
  return (
    <Fragment>
      <Header />
      <section className={classes.borrowing}>
        <div className={classes.heading}>
          <div className={classes.title}>
            <h2>Personal Loan</h2>
            <p>
              Borrow from €1,000 to €25,000, with an instant decision and quick
              access to funds
            </p>
          </div>
          <div className={classes.image}>
            <img src={borrowing} alt="banking" />
          </div>
        </div>
        <div className={classes.description}>
          <h2>Borrow from €1,000 to €25,000</h2>
          <p>
            Always know what you'll have to pay with fixed monthly repayments
            spread over 1 to 5 years for loans of €15,000 or less, or over 1 to
            8 years for loans over €15,000
          </p>
        </div>
        <div className={classes.description}>
          <h2>Get a quick decision</h2>
          <p>
            If you've got an Providence premier account you can get an instant
            credit decision, while non-Providence premier account customers
            should get a credit decision in 2 to 5 working days.
          </p>
        </div>
        <div className={classes.description}>
          <h2>Quick access to funds</h2>
          <p>
            Existing Providence premier account customers could receive the
            money instantly once your application has been approved and the loan
            agreement has been signed. Non-Providence premier account customers
            could receive the money into a nominated account 3 working days
            after the signed loan agreement is received.
          </p>
        </div>
        <div className={classes.description}>
          <h2>Make overpayments free of charge</h2>
          <p>
            Manage your finances the way you want with the flexibility to
            overpay, which could reduce the amount of interest you have to pay.
          </p>
        </div>
      </section>
      ;
      <Footer />
    </Fragment>
  );
};

export default Borrowing;

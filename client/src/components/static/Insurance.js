import { Fragment } from "react";
import Footer from "../main/Footer";
import Header from "../main/Header";
import classes from "./Insurance.module.css";
import insurance from "../../images/insurance.jpg";

const Insurance = () => {
  return (
    <Fragment>
      <Header />
      <section className={classes.insurance}>
        <div className={classes.heading}>
          <div className={classes.title}>
            <h2>Select and Cover</h2>
            <p>
              Choose 3 or more types of cover to build a policy that’s right for
              you
            </p>
          </div>
          <div className={classes.image}>
            <img src={insurance} alt="banking" />
          </div>
        </div>
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
          <h2>Create the policy that suits you</h2>
          <p>
            Choose from a range of insurance options, including Worldwide
            Travel, Mobile Phone and Motor Breakdown cover. You can then make
            changes to your policy each year, as long as you keep a minimum of 3
            types of cover.
          </p>
        </div>
        <div className={classes.description}>
          <h2>Get cover for you and your family</h2>
          <p>
            Relax knowing your family will be covered, including your partner
            and any children under 18 who live with you. Plus, any children
            under 23 who are in full-time education, but are at home outside of
            term time.
          </p>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Insurance;

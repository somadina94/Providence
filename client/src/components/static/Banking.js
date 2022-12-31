import classes from "./Banking.module.css";
import premier from "../../images/premier.jpeg";
import { Fragment } from "react";
import Header from "../main/Header";
import Footer from "../main/Footer";

const Banking = () => {
  return (
    <Fragment>
      <Header />
      <section className={classes.premier}>
        <div className={classes["title-container"]}>
          <div className={classes.title}>
            <h2>Premier Bank Account</h2>
            <p>Our premium bank account with no monthly account fee.</p>
          </div>
          <div className={classes.image}>
            <img src={premier} alt="boy well dressed and looking behind" />
          </div>
        </div>
        <div className={classes.description}>
          <h2>The account that unlocks a world of opportunity</h2>
          <p>
            Providence Premier is here to help you and your family live a life
            full of life. Whether you're buying a new home, investing in your
            future, caring for loved ones - or simply looking to enjoy the
            benefits of all your hard work.
          </p>
        </div>
        <div className={classes.description}>
          <h2>Support for you</h2>
          <p>
            Our team of professionals are there to help you to manage your
            banking and finances. Our aim is to meet your personal needs so you
            can make the most of Providence Premier. You can also get Providence
            Premier Financial Advice to help you make the right choices when
            planning for the future. Fees and eligibility criteria also apply
            for our financial advice service.
          </p>
        </div>
        <div className={classes.description}>
          <h2>Overdraft</h2>
          <p>
            When you open this account, you'll have the option to take out an
            arranged overdraft. An arranged overdraft allows you to borrow money
            (up to an agreed limit) if there’s no money left in your account.
            This can be useful if you're hit with an unexpected bill, for
            example. If a payment would take you past your arranged limit (or if
            you don’t have one), we may let you borrow using an unarranged
            overdraft. There's a chance that payments you try to make using an
            unarranged overdraft may be declined. However, we'll always try to
            allow essential payments if we can. You can apply for an arranged
            overdraft when you open your account, or at any time later. You can
            ask to increase, remove or reduce your limit at any time in online
            or mobile banking, by phone or in-branch. Your new limit can't be
            less than what you owe. We report account activity, including
            overdraft usage, to credit reference agencies. An unarranged
            overdraft lasting more than 30 days could have a negative impact on
            your credit rating. Overdrafts are designed for short-term borrowing
            only and are subject to status
          </p>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Banking;

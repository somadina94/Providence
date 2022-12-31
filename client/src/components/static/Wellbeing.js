import { Fragment } from "react";
import Footer from "../main/Footer";
import Header from "../main/Header";
import classes from "./Wellbeing.module.css";
import wellbeing from "../../images/wellbeing.jpg";

const Wellbeing = () => {
  return (
    <Fragment>
      <Header />
      <section className={classes.wellbeing}>
        <div className={classes.heading}>
          <div className={classes.title}>
            <h2>Financial health tools & webinars</h2>
            <p>Let us help you get financially fit</p>
          </div>
          <div className={classes.image}>
            <img src={wellbeing} alt="banking" />
          </div>
        </div>
        <div className={classes.description}>
          <h2>Find out what we can offer</h2>
          <p>
            Everyone has a different financial journey ahead. We can offer a
            range of different types of support to help you stay on top of your
            finances at every step. Our Financial Health Specialists are
            standing by to offer you a financial health check by phone.
            Alternatively, use the financial fitness tool to get tips on how to
            improve your financial health. You don't need to bank with
            Providence to take advantage of any of these resources.
          </p>
        </div>
        <div className={classes.description}>
          <h2>Find out how financially fit you are</h2>
          <p>
            Knowing how healthy your finances are can help you work out what
            steps you need to take to achieve your goals. Generate your own or
            household financial fitness score out of 100 by answering a few
            quick questions. It takes about 10 minutes, and doesn't affect your
            credit score in any way.
          </p>
        </div>
        <div className={classes.description}>
          <h2>Register for one of our support webinars</h2>
          <p>
            Everyone has a different financial journey ahead of them. Our free
            webinars will give you the insight, knowledge and tools to reach
            your financial goals and build a strong foundation for the future.
            Each webinar lasts 30 to 60 minutes and they're open to all - no
            matter who you bank with (max spaces 1,000). We also understand the
            pressures of the cost of living, so have arranged some special cost
            of living webinars which you can join as well.
          </p>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Wellbeing;

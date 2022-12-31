import classes from "./Footer.module.css";
import approvedby1 from "../../images/validation1.png";
import approvedby2 from "../../images/validation2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className={classes.footer}>
      <div className={classes["footer-texts"]}>
        <Link to="/contact-us">
          <address>Email: support@provbm.com</address>
        </Link>
        <address>
          Mercury Tower, The Exchange Financial & Business Centre, Elia Zammit
          Street, St. Julian's STJ 3155, Malta
        </address>
        <p>
          Providence Bank PLC is authorised by the Prudential Regulation
          Authority and regulated by the Financial Conduct Authority and the
          Prudential Regulation Authority.
        </p>
        <p>
          Providence Insurance Services Company Limited and Providence
          Investment Solutions Limited are each authorised and regulated by the
          Financial Conduct Authority.
        </p>
      </div>
      <div className={classes.footerimg}>
        <img src={approvedby1} alt="fscs" />
        <img src={approvedby2} alt="bsi" />
      </div>
      <p>
        Providence Group | @ Copyright Providence Group 2002-2023. All rights
        reserved
      </p>
    </section>
  );
};

export default Footer;

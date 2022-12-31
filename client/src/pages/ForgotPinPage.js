import { Fragment } from "react";
import Footer from "../components/main/Footer";
import ForgotPin from "../components/main/ForgotPin";
import LoginHeader from "../components/Auth/LoginHeader";

const ForgotPinPage = () => {
  return (
    <Fragment>
      <LoginHeader />
      <ForgotPin />
      <Footer />
    </Fragment>
  );
};

export default ForgotPinPage;

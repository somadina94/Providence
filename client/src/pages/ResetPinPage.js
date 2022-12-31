import { Fragment } from "react";
import LoginHeader from "../components/Auth/LoginHeader";
import Footer from "../components/main/Footer";
import ResetPin from "../components/main/ResetPin";

const ResetPinPage = () => {
  return (
    <Fragment>
      <LoginHeader />
      <ResetPin />
      <Footer />
    </Fragment>
  );
};

export default ResetPinPage;

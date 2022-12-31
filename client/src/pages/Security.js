import { Fragment } from "react";
import LoginHeader from "../components/Auth/LoginHeader";
import SecurityForm from "../components/Auth/SecurityForm";
import Footer from "../components/main/Footer";

const Security = () => {
  return (
    <Fragment>
      <LoginHeader />
      <SecurityForm />
      <Footer />
    </Fragment>
  );
};

export default Security;

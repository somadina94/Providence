import { Fragment } from "react";

import Footer from "../components/main/Footer";
import LoginForm from "../components/Auth/LoginForm";
import LoginHeader from "../components/Auth/LoginHeader";

const Login = () => {
  return (
    <Fragment>
      <LoginHeader />
      <LoginForm />
      <Footer />
    </Fragment>
  );
};

export default Login;

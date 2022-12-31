import { Fragment } from "react";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import HomePage from "../components/main/HomePage";

const Static = () => {
  return (
    <Fragment>
      <Header />
      <HomePage />
      <Footer />
    </Fragment>
  );
};

export default Static;

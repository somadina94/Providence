import { Fragment } from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Transition from "react-transition-group/Transition";

import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import Security from "./pages/Security";

import Static from "./pages/Static";
import TransHistory from "./pages/TransHistory";
import AlertModal from "./components/UI/AlertModal";
import Banking from "./components/static/Banking";

import RootLayout from "./pages/RootLayout";
import { loader as dashboardLoader } from "./pages/MyAccount";
import { loader as historyLoader } from "./pages/TransHistory";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import ForgotPinPage from "./pages/ForgotPinPage";
import ResetPinPage from "./pages/ResetPinPage";
import Borrowing from "./components/static/Borrowing";
import Investing from "./components/static/Investing";
import Insurance from "./components/static/Insurance";
import Wellbeing from "./components/static/Wellbeing";
import Help from "./components/static/Help";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Static />} />
      <Route path="banking" element={<Banking />} />
      <Route path="borrowing" element={<Borrowing />} />
      <Route path="investing" element={<Investing />} />
      <Route path="insurance" element={<Insurance />} />
      <Route path="wellbeing" element={<Wellbeing />} />
      <Route path="help" element={<Help />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-pin" element={<ForgotPinPage />} />
      <Route path="/reset-pin/:token" element={<ResetPinPage />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/login/security" element={<Security />} />
      <Route path="/account" element={<MyAccount />} loader={dashboardLoader} />
      <Route
        path="/account/dashboard"
        element={<MyAccount />}
        loader={dashboardLoader}
      />
      <Route
        path="/account/transaction-history"
        element={<TransHistory />}
        loader={historyLoader}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

const App = () => {
  const showModal = useSelector((state) => state.alertSlice.showModal);

  return (
    <Fragment>
      <RouterProvider router={router} />
      <Transition mountOnEnter unmountOnExit in={showModal} timeout={1000}>
        {(state) => <AlertModal />}
      </Transition>
    </Fragment>
  );
};

export default App;

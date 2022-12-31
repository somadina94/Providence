import { Fragment, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Transition from "react-transition-group/Transition";
import { useLoaderData } from "react-router-dom";
import Cookies from "universal-cookie";

import IntTransferForm from "../components/main/IntTransferForm";
import LocalTransferForm from "../components/main/LocalTransferForm";
import PinForm from "../components/main/PinForm";
import Dashboard from "../components/Auth/Dashboard";
import MyAccountHeader from "../components/Auth/MyAccountHeader";
import Footer from "../components/main/Footer";
import BackdropContext from "../components/store/backdrop-context";
import TransferSecurityForm from "../components/UI/TransferSecurityForm";
import IntTransSecurityForm from "../components/main/IntTransSecurityForm";
import PrintPrompt from "../components/UI/PrintPrompt";
import { getMe } from "../api/api";
import { authActions } from "../store.js/auth-slice";

const MyAccount = (props) => {
  const dispatch = useDispatch();
  const bckdrpCtx = useContext(BackdropContext);
  const showSecurity = useSelector((state) => state.transferSlice.showSecurity);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const showPrint = useSelector((state) => state.transferSlice.showPrint);
  const showIntConfirm = useSelector(
    (state) => state.transferSlice.showIntConfirm
  );
  const data = useLoaderData();
  const user = data.data.user;

  useEffect(() => {
    dispatch(authActions.refreshUser({ user }));
  }, [user, dispatch]);

  return (
    <Fragment>
      <Transition
        mountOnEnter
        unmountOnExit
        in={bckdrpCtx.showIntTransfer}
        timeout={1000}
      >
        {(state) => <IntTransferForm />}
      </Transition>
      <Transition
        mountOnEnter
        unmountOnExit
        in={bckdrpCtx.showLocTransfer}
        timeout={1000}
      >
        {(state) => <LocalTransferForm />}
      </Transition>
      <Transition
        mountOnEnter
        unmountOnExit
        in={bckdrpCtx.showChangePin}
        timeout={1000}
      >
        {(state) => <PinForm />}
      </Transition>
      <Transition mountOnEnter unmountOnExit in={showSecurity} timeout={1000}>
        {(state) => <TransferSecurityForm />}
      </Transition>
      <Transition mountOnEnter unmountOnExit in={showPrint} timeout={1000}>
        {(state) => <PrintPrompt />}
      </Transition>
      <Transition mountOnEnter unmountOnExit in={showIntConfirm} timeout={1000}>
        {(state) => <IntTransSecurityForm />}
      </Transition>
      {isLoggedIn && <MyAccountHeader />}
      {isLoggedIn && <Dashboard />}
      {isLoggedIn && <Footer />}
    </Fragment>
  );
};

export default MyAccount;

export const loader = () => {
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  return getMe(jwt);
};

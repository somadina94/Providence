import { Fragment, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Transition from "react-transition-group/Transition";
import { useLoaderData } from "react-router-dom";
import Cookies from "universal-cookie";

import HistoryForm from "../components/Auth/HistoryForm";
import HistoryList from "../components/Auth/HistoryList";
import MyAccountHeader from "../components/Auth/MyAccountHeader";
import Footer from "../components/main/Footer";
import PinForm from "../components/main/PinForm";
import BackdropContext from "../components/store/backdrop-context";
import IntTransferForm from "../components/main/IntTransferForm";
import LocalTransferForm from "../components/main/LocalTransferForm";
import TransferSecurityForm from "../components/UI/TransferSecurityForm";
import IntTransSecurityForm from "../components/main/IntTransSecurityForm";
import { getMe } from "../api/api";
import PrintPrompt from "../components/UI/PrintPrompt";
import { authActions } from "../store.js/auth-slice";

const TransHistory = (props) => {
  const dispatch = useDispatch();
  const bckdrpCtx = useContext(BackdropContext);
  const showSecurity = useSelector((state) => state.transferSlice.showSecurity);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const showPrint = useSelector((state) => state.transferSlice.showPrint);
  const showIntConfirm = useSelector(
    (state) => state.transferSlice.showIntConfirm
  );
  const data = useLoaderData();
  console.log(data);
  const user = data.data.user;

  useEffect(() => {
    dispatch(authActions.refreshUser({ user }));
  }, [user, dispatch]);

  return (
    <Fragment>
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
        in={bckdrpCtx.showIntTransfer}
        timeout={1000}
      >
        {(state) => <IntTransferForm />}
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
      <Transition mountOnEnter unmountOnExit in={showIntConfirm} timeout={1000}>
        {(state) => <IntTransSecurityForm />}
      </Transition>
      <Transition mountOnEnter unmountOnExit in={showPrint} timeout={1000}>
        {(state) => <PrintPrompt />}
      </Transition>
      {isLoggedIn && <MyAccountHeader />}
      {isLoggedIn && <HistoryForm />}
      {isLoggedIn && <HistoryList />}
      {isLoggedIn && <Footer />}
    </Fragment>
  );
};

export default TransHistory;

export const loader = () => {
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  return getMe(jwt);
};

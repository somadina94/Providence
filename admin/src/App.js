import { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AdminLayout from "./pages/AdminLayout";
import MainBody from "./components/admin/MainBody";
import UserDetails from "./components/admin/UserDetails";
import Create from "./components/admin/Create";
import Transactions from "./components/admin/Transactions";
import LoginForm from "./components/auth/LoginForm";
import ErrorModal from "./components/UI/ErrorModal";

import { loader as usersLoader } from "./components/admin/MainBody";
import { loader as transLoader } from "./components/admin/Transactions";

import LoadSpinner from "./components/UI/LoadSpinner";
import AlertModal from "./components/UI/AlertModal";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AdminLayout />} errorElement={<ErrorModal />}>
      <Route index element={<LoginForm />} />
      <Route path="users" element={<MainBody />} loader={usersLoader} />
      <Route path="/users/:userId" element={<UserDetails />} />
      <Route path="new-account" element={<Create />} />
      <Route
        path="users/:userId/transactions"
        element={<Transactions />}
        loader={transLoader}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function App() {
  const showSpinner = useSelector((state) => state.spinner.showSpinner);
  const showModal = useSelector((state) => state.alert.showModal);

  return (
    <Fragment>
      <RouterProvider router={router} />
      {showSpinner && <LoadSpinner />}
      {showModal && <AlertModal />}
    </Fragment>
  );
}

export default App;

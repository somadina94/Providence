import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/admin/Header";

const AdminLayout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AdminLayout;

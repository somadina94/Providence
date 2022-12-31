import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

import classes from "./MainBody.module.css";
import Card from "./Card";
import { Fragment, useEffect } from "react";
import { getAllUsers } from "../../api/api";
import { adminActions } from "../../store/admin-slice";
import { spinnerActions } from "../../store/spinner-slice";

const MainBody = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const users = data.data.users;

  useEffect(() => {
    dispatch(adminActions.setUsers({ users }));
    dispatch(spinnerActions.hideSpinner());
  }, [dispatch, users]);

  return (
    <Fragment>
      <ul className={classes.accounts}>
        {users.map((user) => (
          <Card key={user._id} user={user} />
        ))}
      </ul>
    </Fragment>
  );
};

export default MainBody;

export const loader = async () => {
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  return getAllUsers(jwt);
};

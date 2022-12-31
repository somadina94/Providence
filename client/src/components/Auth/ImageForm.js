import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import UploadPhoto from "../icons/UploadPhoto";
import classes from "./ImageForm.module.css";
import { updateSettings } from "../../api/api";
import { alertActions } from "../../store.js/alert-slice";
import { authActions } from "../../store.js/auth-slice";
import TinySpinner from "../UI/TinySpinner";

const ImageForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSpinner = useSelector((state) => state.authSlice.showSpinner);
  const imageInputRef = useRef();
  const { jwt } = useCookies(["jwt"])[0];

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(authActions.setSpinner());
    const form = new FormData();
    const photo = imageInputRef.current.files[0];
    form.append("photo", photo);

    const data = await updateSettings(form, "data", jwt);

    if (data.status === "success") {
      dispatch(authActions.removeSpinner());
      dispatch(
        alertActions.setState({
          message: "Photo uploaded successfully!",
          status: data.status,
        })
      );
      navigate("/account/dashboard");
    } else {
      dispatch(authActions.removeSpinner());
      dispatch(
        alertActions.setState({
          message: data.message,
          status: "error",
        })
      );
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      {showSpinner && <TinySpinner />}
      <label htmlFor="file-input">
        <UploadPhoto />
        <h2>Select</h2>
      </label>
      <input type="file" id="file-input" ref={imageInputRef} />
      <button type="submit">Change photo</button>
    </form>
  );
};

export default ImageForm;

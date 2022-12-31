import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    <section className={classes.backdrop} onClick={props.onHide}></section>
  );
};

export default Backdrop;

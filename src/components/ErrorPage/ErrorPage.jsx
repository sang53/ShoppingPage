import PropTypes from "prop-types";
import classes from "./ErrorPage.module.css";

export default function ErrorPage({ message }) {
  return (
    <div className={`flex-column-center gap-1rem ${classes.container}`}>
      <h1>Something went wrong!</h1>

      <img
        src="/ShoppingPage/error.jpg"
        alt="Page Not Found"
        className={classes.image}
      />

      <p>{message}</p>
    </div>
  );
}

ErrorPage.propTypes = {
  message: PropTypes.string,
};

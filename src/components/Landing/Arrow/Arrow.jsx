import classes from "./Arrow.module.css";
import PropTypes from "prop-types";

const arrowLeftSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#ffffff"
  >
    <title>Left Arrow</title>
    <path d="M559.19-258.69 337.89-480l221.3-221.31 38.92 39.73L416.54-480l181.57 181.58-38.92 39.73Z" />
  </svg>
);
const arrowRightSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#ffffff"
  >
    <title>Right Arrow</title>
    <path d="M519.46-480 337.89-661.58l38.92-39.73L598.11-480l-221.3 221.31-38.92-39.73L519.46-480Z" />
  </svg>
);

export default function Arrow({ isLeft, idx, onClick }) {
  const className =
    "no-select z-idx-1 " + (isLeft ? classes.arrowLeft : classes.arrowRight);
  return (
    <button
      onClick={() => {
        onClick(idx, isLeft ? -1 : 1);
      }}
      className={className}
    >
      {isLeft ? arrowLeftSVG : arrowRightSVG}
    </button>
  );
}

Arrow.propTypes = {
  isLeft: PropTypes.bool.isRequired,
  idx: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

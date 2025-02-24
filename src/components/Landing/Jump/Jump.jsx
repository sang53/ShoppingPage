import PropTypes from "prop-types";
import classes from "./Jump.module.css";
import { memo } from "react";

export default function Jump({ idx, onClick, displayNum }) {
  const buttons = [];
  const className = "no-select z-idx-1 flex gap-1rem " + classes.jumpContainer;

  for (let i = 0; i < displayNum; i++) {
    buttons.push(
      <JumpButton key={i} idx={i} curr={i === idx} onClick={onClick} />
    );
  }

  return (
    <div id="jump-buttons-container" className={className}>
      {buttons}
    </div>
  );
}

const JumpButton = memo(function JumpButton({ idx, curr, onClick }) {
  return (
    <button
      onClick={curr ? undefined : () => onClick(idx)}
      className={curr ? classes.currJumpButton : classes.jumpButton}
      aria-current={curr && "carousel"}
    >
      {idx + 1}
    </button>
  );
});

Jump.propTypes = {
  idx: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  displayNum: PropTypes.number.isRequired,
};

JumpButton.propTypes = {
  idx: PropTypes.number.isRequired,
  curr: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

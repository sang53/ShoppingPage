import classes from "./DisplayContainer.module.css";
import PropTypes from "prop-types";
import DisplayItem from "../DisplayItem/DisplayItem";

export default function DisplayContainer({ displayItems }) {
  const output = displayItems.map((obj) => {
    return <DisplayItem key={obj.id} obj={obj} />;
  });
  return (
    <div className={"flex gap-1rem pad-1rem " + classes.displayContainer}>
      {output.length ? output : "Loading..."}
    </div>
  );
}

DisplayContainer.propTypes = {
  displayItems: PropTypes.array.isRequired,
};

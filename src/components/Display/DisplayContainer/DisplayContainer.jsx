import classes from "./DisplayContainer.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router";

export default function DisplayContainer({ displayItems }) {
  const output = displayItems.map((obj) => {
    return (
      <Link to={obj.link} key={obj.id} className="product">
        <div className="product-img">
          <img src={obj.image} alt={obj.title} />
        </div>
        <div>
          <div>{obj.title}</div>
          {obj.price && <div>{obj.price}</div>}
        </div>
      </Link>
    );
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

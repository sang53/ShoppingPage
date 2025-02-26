import PropTypes from "prop-types";
import { Link } from "react-router";
import DisplayObj from "../DisplayObj/DisplayObj";
import { memo } from "react";

const DisplayItem = ({ obj }) => {
  return (
    <Link to={obj.link} key={obj.id} className="product">
      <div className="product-img">
        <img src={obj.image} alt={obj.title} />
      </div>
      <div>
        <div id="title">{obj.title}</div>
        {obj.price && <div>{obj.price}</div>}
      </div>
    </Link>
  );
};

export default memo(DisplayItem);

DisplayItem.propTypes = {
  obj: PropTypes.instanceOf(DisplayObj),
};

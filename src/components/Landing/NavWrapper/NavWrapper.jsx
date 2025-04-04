import Arrow from "../Arrow/Arrow";
import Jump from "../Jump/Jump";
import PropTypes from "prop-types";
import useCarouselNavigation from "./useCarouselNavigation/useCarouselNavigation";
import classes from "./NavWrapper.module.css";

export default function NavWrapper({ children, startIdx, displayNum }) {
  const { currIdx, scrollToIdx } = useCarouselNavigation(startIdx, displayNum);

  return (
    <div className={`flex-column-center ${classes.container}`}>
      <div
        className={`flex gap-1rem relative ${classes.carousel}`}
        id="carousel"
      >
        <Arrow isLeft={true} idx={currIdx} onClick={scrollToIdx} />
        {children}

        <Arrow isLeft={false} onClick={scrollToIdx} idx={currIdx} />
      </div>
      <Jump onClick={scrollToIdx} idx={currIdx} displayNum={displayNum} />
    </div>
  );
}

NavWrapper.propTypes = {
  children: PropTypes.element,
  startIdx: PropTypes.number.isRequired,
  displayNum: PropTypes.number.isRequired,
};

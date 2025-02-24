import Arrow from "../Arrow/Arrow";
import Jump from "../Jump/Jump";
import PropTypes from "prop-types";
import useCarouselNavigation from "./useCarouselNavigation/useCarouselNavigation";

export default function NavWrapper({ children, startIdx, displayNum }) {
  const { currIdx, scrollToIdx } = useCarouselNavigation(startIdx, displayNum);

  return (
    <>
      <Arrow isLeft={true} idx={currIdx} onClick={scrollToIdx} />
      {children}
      <Jump onClick={scrollToIdx} idx={currIdx} displayNum={displayNum} />
      <Arrow isLeft={false} onClick={scrollToIdx} idx={currIdx} />
    </>
  );
}

NavWrapper.propTypes = {
  children: PropTypes.element,
  startIdx: PropTypes.number.isRequired,
  displayNum: PropTypes.number.isRequired,
};

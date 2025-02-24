import { useCallback, useEffect, useState } from "react";

export default function useCarouselNavigation(startIdx, displayNum) {
  const [currIdx, setCurrIdx] = useState(startIdx);

  const scrollToIdx = useCallback(
    (idx, delta = 0) => {
      idx = (idx + delta + displayNum) % displayNum;
      setCurrIdx(idx);
      scrollIdx(idx);
    },
    [displayNum]
  );

  useEffect(() => scrollIdx(startIdx), [startIdx]);

  return { currIdx, scrollToIdx };
}

function scrollIdx(idx) {
  const carouselProduct = document.querySelector(`#carousel-${idx}`);
  carouselProduct.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
}

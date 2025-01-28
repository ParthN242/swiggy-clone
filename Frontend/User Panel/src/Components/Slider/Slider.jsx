import React, { useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Slider = ({ element }) => {
  let currentElement = element;

  if (!currentElement) return null;
  return (
    <div className="flex items-center gap-5 max-md:gap-3">
      <div
        className="p-2 max-md:p-[7px] rounded-full bg-[#D8D9DA] cursor-pointer"
        onClick={() => {
          currentElement &&
            currentElement.scrollTo({
              left: currentElement.scrollLeft - 350,
            });
        }}
        // aria-disabled={currentElement && currentElement.scrollLeft === 0}
      >
        <FaArrowLeftLong className="text-sm max-md:text-[10px]" />
      </div>
      <div
        className="p-2 max-md:p-[7px] rounded-full bg-[#D8D9DA] cursor-pointer"
        onClick={() => {
          currentElement &&
            currentElement.scrollTo({
              left: currentElement.scrollLeft + 350,
            });
        }}
      >
        <FaArrowRightLong className="text-sm max-md:text-[10px]" />
      </div>
    </div>
  );
};

export default Slider;

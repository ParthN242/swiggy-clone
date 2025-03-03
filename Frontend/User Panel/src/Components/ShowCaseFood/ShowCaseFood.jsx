import { useEffect, useRef, useState } from "react";
import Slider from "../Slider/Slider";
import { data } from "./data";

const ShowCaseFood = () => {
  const sliderRef = useRef(null);
  const [currentSlider, setCurrentSlider] = useState(null);

  useEffect(() => {
    if (sliderRef.current) {
      setCurrentSlider(sliderRef.current);
    }
  }, [sliderRef]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = 150;
    let direction = 1;

    const interval = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        direction = -1;
      } else if (slider.scrollLeft <= 0) {
        // direction = 1;
        slider.scrollLeft = 0;
      }
      slider.scrollLeft += scrollAmount * direction;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 max-md:p-2">
      <div className="flex items-center justify-between mb-4 max-md:mb-2">
        <h4 className="text-[22px] max-md:text-[20px] font-[gil-bold]">
          What&apos;s on your mind?
        </h4>
        <Slider element={currentSlider} />
      </div>
      <div className="overflow-x-scroll scrollbar-none" ref={sliderRef}>
        <div className="grid grid-flow-col max-md:grid-rows-2 gap-2 ">
          {data.length > 0 &&
            data.map((d) => (
              <div
                className="flex-shrink-0 cursor-pointer w-[144px] max-md:w-[80px]"
                key={d.id}
              >
                <img
                  className="h-[180px] max-md:h-[96px] w-full object-contain"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${d.imageId}`}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShowCaseFood;

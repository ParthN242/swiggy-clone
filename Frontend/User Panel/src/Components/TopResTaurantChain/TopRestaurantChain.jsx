import React, { useEffect, useRef, useState } from "react";
import Slider from "../Slider/Slider";
import { MdStars } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopRestaurantChain = () => {
  const { restaurants } = useSelector((state) => state.app);

  const sliderRef = useRef(null);
  const [currentSlider, setCurrentSlider] = useState(null);

  useEffect(() => {
    if (sliderRef.current) {
      setCurrentSlider(sliderRef.current);
    }
  }, [sliderRef]);
  return (
    <div className="p-4 max-md:p-2">
      <div className="flex items-center justify-between max-md:gap-2 mb-4">
        <h4 className="text-[22px] max-md:text-[20px]  font-[gil-bold]">
          Top restaurant chains in Surat
        </h4>
        <Slider element={currentSlider} />
      </div>
      <div
        className="flex flex-nowrap gap-8 max-md:gap-4 max-w-full overflow-x-auto scrollbar-none"
        ref={sliderRef}
      >
        {restaurants.length > 0 &&
          restaurants.map((res) => (
            <Link
              to={`/restaurant/${res._id}`}
              className="min-w-[250px] max-md:min-w-[160px] flex flex-col gap-2 hover:scale-[0.98] transition-all duration-100 ease-out"
              key={res._id}
            >
              <div className="relative w-full h-[180px] max-md:h-40 ">
                <img
                  className="w-full h-full object-cover rounded-2xl"
                  src={res.image}
                  alt=""
                />
              </div>
              {/* Info */}
              <div>
                <p className="font-[gil-bold] text-lg max-md:text-[16px] max-md:leading-[19px] truncate">
                  {res.name}
                </p>
                <div className="flex items-center gap-1">
                  <MdStars className="text-green-700 text-lg max-md:text-[14px]" />
                  {res.avgRating}
                  {" • "}
                  {res.minTime} - {res.maxTime} mins
                </div>
                <div className="truncate-2  max-md:text-[14px]">
                  <p className="text-light-gray text-sm line-clamp-2">
                    {res.cuisines.join(", ")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        {restaurants.length === 0 &&
          Array(4)
            .fill(0)
            .map((res) => (
              <div
                className="min-w-[250px] max-md:min-w-[136px] flex flex-col gap-2 hover:scale-[0.98] transition-all duration-100 ease-out"
                key={res._id}
              >
                <div className="relative w-full h-[180px] max-md:h-40 ">
                  <div className="w-full h-full object-cover rounded-2xl bg-slate-200" />
                </div>
                {/* Info */}
                <div>
                  <p className="font-[gil-bold] text-lg max-md:text-[16px] max-md:leading-[19px] truncate bg-slate-200 text-slate-200 rounded-2xl">
                    ..
                  </p>
                  <div className="flex items-center gap-1 bg-slate-200 text-slate-200 rounded-2xl">
                    ..
                  </div>
                  <div className="truncate-2  max-md:text-[14px] mt-[2px]">
                    <p className="text-sm line-clamp-2 bg-slate-200 text-slate-200 rounded-2xl">
                      ..
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TopRestaurantChain;

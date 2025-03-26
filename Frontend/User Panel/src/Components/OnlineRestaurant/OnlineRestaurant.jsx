import React, { useEffect, useRef, useState } from "react";
import { MdStars } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OnlineRestaurant = () => {
  const { restaurants } = useSelector((state) => state.app);
  return (
    <div className="px-4 py-8 max-md:px-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[22px] max-md:text-[20px] font-[gil-bold]">
          Restaurants with online food delivery in Surat
        </h4>
      </div>
      <div className="mb-4 flex items-center gap-2">
        {/* <div className="py-2 px-3 border border-[rgba(2, 6, 12, 0.15)] rounded-[18px] text-[#02060cbf]">
          Filter
        </div> */}
      </div>
      <div className="grid grid-cols-4 max-md:grid-cols-2 gap-6 max-md:gap-y-8 max-md:gap-4 max-w-full scrollbar-none">
        {restaurants.length > 0 &&
          restaurants.map((res) => (
            <Link
              to={`/restaurant/${res._id}`}
              className={`w-full flex flex-col gap-4 hover:scale-[0.98] transition-all duration-100 ease-out`}
              key={res._id}
            >
              <div className="relative w-full h-[135px] max-md:h-[210px]">
                <img
                  className="w-full h-full object-cover rounded-2xl"
                  src={res.image}
                  alt=""
                />
              </div>
              {/* Info */}
              <div>
                <p className="font-[gil-bold] text-lg leading-4 truncate">
                  {res.name}
                </p>
                <div className="flex items-center gap-1 line-clamp-1 whitespace-nowrap ">
                  <MdStars className="text-green-700 text-lg " />
                  {res.avgRating}
                  {" • "}
                  {res.minTime} - {res.maxTime} mins
                </div>
                <div className="w-full line-clamp-2">
                  {res.cuisines.join(", ")}
                </div>
              </div>
            </Link>
          ))}
        {restaurants.length === 0 &&
          Array(10)
            .fill(0)
            .map((res, index) => (
              <div
                className={`w-full flex flex-col gap-4 hover:scale-[0.98] transition-all duration-100 ease-out`}
                key={index}
              >
                <div className="relative w-full h-[135px]">
                  <div className="w-full h-full object-cover rounded-2xl bg-slate-200" />
                </div>
                {/* Info */}
                <div>
                  <p className="font-[gil-bold] text-lg max-md:text-[16px] max-md:leading-[19px] truncate bg-slate-200 text-slate-200 rounded-2xl mb-1">
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

export default OnlineRestaurant;

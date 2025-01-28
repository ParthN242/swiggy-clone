import React from "react";

const DashboardCard = ({ title, value }) => {
  return (
    <div className="w-[32%] bg-white text-[rgb(255,159,34)] rounded-lg p-4 border border-[rgb(255,159,34)]">
      <div className="rounded-full border-[10px] border-[rgb(255,159,34)] w-40 h-40 flex items-center justify-center mx-auto">
        <p className="text-4xl">{value}</p>
      </div>
      <div className="pt-4">
        <p className="text-center text-2xl capitalize font-semibold">{title}</p>
      </div>
    </div>
  );
};

export default DashboardCard;

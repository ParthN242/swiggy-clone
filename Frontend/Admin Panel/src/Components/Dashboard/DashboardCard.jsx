const DashboardCard = ({ title, value, icon }) => {
  return (
    <div
      className={`relative w-full h-full text-white bg-[#ff5200] rounded-2xl p-4 max-md:p-3 border border-[rgb(255,159,34)] flex flex-col ${
        title === "total Revenue" && "col-span-2 max-xs:col-span-1"
      }`}
    >
      <div className="absolute -top-8 left-0 w-full h-full z-1 flex items-center justify-center">
        <div className="text-black/10 text-[105px] max-md:text-[85px]">
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <div className="rounded-full border-[10px] max-md:border-[8px] border-white w-full max-w-40 max-md:max-w-32 aspect-square flex items-center justify-center mx-auto">
          <p className="text-4xl max-md:text-3xl">
            {title === "total Revenue" && "₹"}
            {value}
          </p>
        </div>
        <div className="pt-4">
          <p className="text-center text-2xl max-md:text-xl capitalize font-semibold">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

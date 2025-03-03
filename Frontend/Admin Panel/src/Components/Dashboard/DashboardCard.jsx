const DashboardCard = ({ title, value }) => {
  return (
    <div className="max-w-[32%] w-full h-full bg-white text-[rgb(255,159,34)] rounded-lg p-4 border border-[rgb(255,159,34)] flex flex-col">
      <div className="rounded-full border-[10px] border-[rgb(255,159,34)] w-full max-w-40 aspect-square flex items-center justify-center mx-auto">
        <p className="text-4xl">{value}</p>
      </div>
      <div className="pt-4">
        <p className="text-center text-2xl capitalize font-semibold">{title}</p>
      </div>
    </div>
  );
};

export default DashboardCard;

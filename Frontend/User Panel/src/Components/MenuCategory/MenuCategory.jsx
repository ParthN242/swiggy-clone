import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Item from "./Item";

const MenuCategory = ({ title, itemCards, resDetailsData }) => {
  const menuData = itemCards.map((x) => {
    return x.card.info;
  });
  const [isOpen, setIsOpen] = useState(true);
  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="py-3 ">
      <div
        className="flex justify-between items-center"
        onClick={toggleCategory}
      >
        <h3 className="font-bold text-lg">
          {title} ({itemCards.length})
        </h3>
        <div>
          <FaChevronDown className={`${!isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>
      <div>
        {isOpen &&
          menuData.map((item) => {
            return (
              <Item
                {...item}
                key={{ ...item }.id}
                resDetailsData={resDetailsData}
              />
            );
          })}
      </div>
      <div className="bg-[#02060c0d] h-2 mt-3"></div>
    </div>
  );
};

export default MenuCategory;

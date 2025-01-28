import { GiFruitTree, GiBeerBottle, GiBowlOfRice } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { MdOutlineFastfood } from "react-icons/md";

const categories = [
  {
    id: 1,
    name: "Fruits",
    urlParam: "fruits",
    icon: <GiFruitTree />,
  },
  {
    id: 3,
    name: "Soft Drinks",
    urlParam: "drinks",
    icon: <GiBeerBottle />,
  },
  {
    id: 4,
    name: "Desserts",
    urlParam: "desserts",
    icon: <MdOutlineFastfood />,
  },
  {
    id: 5,
    name: "Icecreams",
    urlParam: "icecreams",
    icon: <MdOutlineIcecream />,
  },
  {
    id: 6,
    name: "Rice",
    urlParam: "rice",
    icon: <GiBowlOfRice />,
  },
];

export default categories;

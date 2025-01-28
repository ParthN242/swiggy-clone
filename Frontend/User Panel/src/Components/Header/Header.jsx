import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../Redux/appSlice";

const Header = () => {
  const { user, cart } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <div className="sticky top-0 left-0 w-[100%] h-[70px] shadow-1-sm z-10 bg-white">
      <div className="w-[80%] max-md:w-[95%] h-full mx-auto flex items-center gap-5 ">
        {/* Company Icon */}
        <Link to={"/"} className="">
          {/* <svg className="w-[49px] max-sm:w-[35px]" viewBox="0 0 61 61">
            <g clipPath="url(#a)">
              <path
                fill="#FF5200"
                d="M.32 30.5c0-12.966 0-19.446 3.498-23.868a16.086 16.086 0 0 1 2.634-2.634C10.868.5 17.354.5 30.32.5s19.446 0 23.868 3.498c.978.774 1.86 1.656 2.634 2.634C60.32 11.048 60.32 17.534 60.32 30.5s0 19.446-3.498 23.868a16.086 16.086 0 0 1-2.634 2.634C49.772 60.5 43.286 60.5 30.32 60.5s-19.446 0-23.868-3.498a16.086 16.086 0 0 1-2.634-2.634C.32 49.952.32 43.466.32 30.5Z"
              ></path>
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M32.317 24.065v-6.216a.735.735 0 0 0-.732-.732.735.735 0 0 0-.732.732v7.302c0 .414.336.744.744.744h.714c10.374 0 11.454.54 10.806 2.73-.03.108-.066.21-.102.324-.006.024-.012.048-.018.066-2.724 8.214-10.092 18.492-12.27 21.432a.764.764 0 0 1-1.23 0c-1.314-1.776-4.53-6.24-7.464-11.304-.198-.462-.294-1.542 2.964-1.542h3.984c.222 0 .402.18.402.402v3.216c0 .384.282.738.666.768a.73.73 0 0 0 .582-.216.701.701 0 0 0 .216-.516v-4.362a.76.76 0 0 0-.756-.756h-8.052c-1.404 0-2.256-1.2-2.814-2.292-1.752-3.672-3.006-7.296-3.006-10.152 0-7.314 5.832-13.896 13.884-13.896 7.17 0 12.6 5.214 13.704 11.52.006.054.048.294.054.342.288 3.096-7.788 2.742-11.184 2.76a.357.357 0 0 1-.36-.36v.006Z"
                clipRule="evenodd"
              ></path>
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M.32.5h60v60h-60z"></path>
              </clipPath>
            </defs>
          </svg> */}
          <img
            src="/web-logo.png"
            alt="logo"
            className="w-[60px] max-sm:w-[70px]"
          />
        </Link>
        {/* <div>
          <p className="font-bold underline">Other</p>
        </div> */}
        <ul className="flex flex-1 justify-end items-center gap-16 max-md:gap-10 mr-4 ">
          <li className="max-sm:hidden">
            <Link
              to={"/search"}
              className="flex items-center gap-[12px] max-md:gap-[5px] text-light-black font-medium text-[16px] max-sm:text-[12px] group"
            >
              <IoSearchOutline className="text-[18px]  group-hover:text-[#FF5B0E]" />
              <p className="group-hover:text-[#FF5B0E] text-[16px] max-sm:text-[12px]">
                Search
              </p>
            </Link>
          </li>
          {user ? (
            <li>
              <Link
                to={"/my-account/orders"}
                className="flex items-center gap-[12px] max-md:gap-[5px] text-light-black font-medium  group"
              >
                <BsPerson className="text-[18px] group-hover:text-[#FF5B0E] " />
                <p className="group-hover:text-[#FF5B0E] capitalize text-[16px] max-sm:text-[12px]">
                  {user.name}
                </p>
              </Link>
            </li>
          ) : (
            <li
              onClick={() => dispatch(setAuth(true))}
              className="flex items-center gap-[12px] max-md:gap-[5px] text-light-black font-medium text-[16px] max-sm:text-[12px] group cursor-pointer"
            >
              <BsPerson className="text-[18px] group-hover:text-[#FF5B0E]" />
              <p className="group-hover:text-[#FF5B0E] text-[16px] max-sm:text-[12px]">
                Sign In
              </p>
            </li>
          )}
          <li>
            <Link
              to={"/cart"}
              className="flex items-center gap-[12px] max-md:gap-[5px] text-light-black font-medium text-[16px] group"
            >
              <span className="relative top-1/2 group">
                <svg
                  className="stroke-2 fill-transparent stroke-current overflow-hidden"
                  viewBox="-1 0 37 32"
                  height="20"
                  width="20"
                  fill="#686b78"
                >
                  <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                </svg>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#f3730a] text-sm font-semibold ">
                  {cart?.cartItems?.length}
                </span>
              </span>
              <p className="group-hover:text-[#FF5B0E] text-[16px] max-sm:text-[12px]">
                Cart
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

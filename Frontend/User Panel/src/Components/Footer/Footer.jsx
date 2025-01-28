import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 max-md:py-5 mx-auto">
      <div className="max-w-[80%] max-md:max-w-[90%] mx-auto px-4">
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-[40px] max-md:gap-[20px]">
          <div className="w-full row-span-2 max-md:row-span-1 max-md:col-span-2 md:mb-0">
            <Link to={"/"}>
              <img
                src="/web-logo.png"
                alt="logo"
                className="w-[60px] max-sm:w-[70px] mix-blend-multiply"
              />
            </Link>
            <p className="text-gray-600">&copy; 2025 Swiggy Limited</p>
          </div>
          <div className="w-full md:mb-0">
            <h5 className="font-bold mb-2">Company</h5>
            <ul className="text-gray-600">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Swiggy Corporate
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Swiggy One
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Swiggy Instamart
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Swiggy Dineout
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Swiggy Genie
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:mb-0">
            <h5 className="font-bold mb-2">Contact us</h5>
            <ul className="text-gray-600">
              <li>
                <a href="#" className="hover:underline">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Partner with us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Ride with us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:mb-0">
            <h5 className="font-bold mb-2">Available in:</h5>
            <ul className="text-gray-600">
              <li>Bangalore</li>
              <li>Gurgaon</li>
              <li>Hyderabad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
            </ul>
          </div>
          <div className="w-full md:mb-0">
            <h5 className="font-bold mb-2">Life at Swiggy</h5>
            <ul className="text-gray-600">
              <li>
                <a href="#" className="hover:underline">
                  Explore with Swiggy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Swiggy News
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Snackables
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:mb-0">
            <h5 className="font-bold mb-2">Legal</h5>
            <ul className="text-gray-600">
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:mb-0">
            <h5 className="font-bold mb-2">Social Links</h5>
            <div className="flex space-x-4">
              <div>
                <FaFacebook />
              </div>
              <div>
                <FaInstagram />
              </div>
              <div>
                <FaTwitter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

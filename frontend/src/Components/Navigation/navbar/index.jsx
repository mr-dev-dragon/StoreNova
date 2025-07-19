import React from "react";
import { CgMonday } from "react-icons/cg";
import classNames from "classnames";
import { BiLogoRedux } from "react-icons/bi";

import styles from "./Navbar.module.css";

const Navbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
  return (
    <nav
      className={
        "hidden md:flex flex-row items-center justify-around px-8 h-18  bg-white"
      }
    >
      <span className={"text-5xl text-gray-800 -mb-1"}>
        <BiLogoRedux />
      </span>
      <ul className={"flex flex-row self-end h-12"}>
        {navigationData.map((item, index) => (
          <li
            className={classNames([
              "w-22 text-gray-400 hover:text-gray-700 cursor-pointer font-medium tracking-wide text-sm flex items-start justify-center",
              currentRoute === item &&
                " text-gray-700 border-b-3 border-gray-700 bg-gradient-to-b from-white to-gray-100",
            ])}
            key={index}
            onClick={() => setCurrentRoute(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <button
        className={
          "bg-white hover:bg-gray-50 border-2 border-gray-900 text-sm text-gray-900 py-3 px-5 rounded-lg font-medium tracking-wide leading-none"
        }
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

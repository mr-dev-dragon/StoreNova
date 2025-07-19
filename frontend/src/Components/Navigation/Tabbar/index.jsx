import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Tabbar.module.css";
import { FiMenu } from "react-icons/fi";
import { FaCircleInfo } from "react-icons/fa6";
import { FiLogOut, FiSettings, FiMoon } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import {
  FiBookmark,
  FiBell,
  FiShield,
  FiFileText,
  FiHelpCircle,
  FiInfo,
} from "react-icons/fi";

const Tabbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const fixedTabItems = ["Home", "Discover", "Cart", "Favorites"];
  const addmore = [
    {
      title: "Bookmarks",
      icon: FiBookmark,
    },
    {
      title: "Notifications",
      icon: FiBell,
    },
    {
      title: "Privacy Policy",
      icon: FiShield,
    },
    {
      title: "Terms & Conditions",
      icon: FiFileText,
    },
    {
      title: "Support",
      icon: FiHelpCircle,
    },
    {
      title: "About",
      icon: FiInfo,
    },
  ];
  const tabItems = navigationData.filter(
    (item) =>
      item.section === "navigation" ||
      (item.section === "actions" && fixedTabItems.includes(item.title))
  );

  const logo = navigationData.find((item) => item.section === "logo");
  const searchBar = navigationData.find((item) => item.section === "search");
  const navigationItems = navigationData.filter(
    (item) => item.section === "navigation"
  );
  const actionItems = navigationData.filter(
    (item) => item.section === "actions"
  );
  const settingItems = navigationData.filter(
    (item) => item.section === "settings"
  );
  const profile = navigationData.find(
    (item) => item.section === "settings" && item.title === "Profile"
  );
  const settings = navigationData.find(
    (item) => item.section === "settings" && item.title === "Profile"
  );

  return (
    <>
      {/* Bottom Tabbar */}
      <nav
        className={classNames([
          styles.navbarShadowTop,
          "flex md:hidden flex-row items-center justify-around px-2 h-16 bg-white visible md:invisible fixed bottom-0 w-full text-2xl z-50  rounded-t-xl ",
        ])}
      >
        {tabItems.map((item, index) => (
          <button
            key={index}
            className={classNames([
              "flex-1 text-gray-400 hover:text-gray-700 cursor-pointer h-full flex flex-col items-center justify-center text-sm",
              currentRoute === item.title && "text-purple-600 font-semibold",
            ])}
            onClick={() => setCurrentRoute(item.title)}
          >
            {item.icon && <item.icon className="text-xl mb-0.5" />}
            <span className="text-xs">{item.title}</span>
          </button>
        ))}

        {/* Menu button */}
        <button
          className="flex-1 text-gray-400 hover:text-gray-700 cursor-pointer h-full flex flex-col items-center justify-center"
          onClick={() => setShowSidebar(true)}
        >
          <FiMenu className="text-xl mb-0.5" />
          <span className="text-xs">More</span>
        </button>
      </nav>

      {/* Sidebar Drawer */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/30 z-50 md:hidden"
          onClick={() => setShowSidebar(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-72 bg-white p-4 flex flex-col gap-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* profile */}
            <div className="items-center justify-between flex mt-5 mr-5">
              <div className="flex items-center justify-around   gap-2 ">
                {profile && profile.avatar && (
                  <img
                    src={profile.avatar}
                    alt="profile"
                    className="h-8 w-8 rounded-full  border-purple-500 object-cover cursor-pointer"
                    onClick={() => {
                      setCurrentRoute(profile.title);
                      // setShowSidebar(false);
                    }}
                  />
                )}
                {settings && settings.icon && (
                  <MdOutlineAddCircleOutline
                    className="text-2xl text-gray-300 hover:text-purple-600 cursor-pointer w-5 h-"
                    onClick={() => {
                      setCurrentRoute(settings.title);
                      // setShowSidebar(false);
                    }}
                  />
                )}
              </div>
              {/* Logo */}
              {logo && (
                <div className="flex items-center justify-around   gap-2 ">
                  {logo.icon && (
                    <logo.icon className="text-2xl text-purple-600" />
                  )}
                  {logo.title && (
                    <span className="text-lg font-semibold text-gray-700">
                      {logo.title}
                    </span>
                  )}
                </div>
              )}
            </div>
            {/* Search Bar */}
            {searchBar && searchBar.input && (
              <div className={styles.containerInput}>
                <div className={styles["search-container"]}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder={searchBar.placeholder}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        window.location.href = searchBar.action || "/search";
                      }
                    }}
                  />
                  <svg viewBox="0 0 24 24" className={styles.search__icon}>
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                    </g>
                  </svg>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <ul className="flex flex-col gap-3">
              {navigationItems.map((item, index) => (
                <li
                  key={index}
                  className={classNames([
                    "flex items-center gap-2 text-gray-600 text-base",
                    currentRoute === item.title &&
                      "text-purple-600 font-semibold",
                  ])}
                  onClick={() => {
                    setCurrentRoute(item.title);
                    setShowSidebar(false);
                  }}
                >
                  {item.icon && <item.icon className="text-xl" />}
                  {item.title}
                </li>
              ))}
            </ul>

            <hr className="border-gray-200" />

            {/* Action Items */}
            <ul className="flex flex-col gap-3">
              {actionItems.map((item, index) => (
                <li
                  key={index}
                  className={classNames([
                    "flex items-center gap-2 text-gray-600 text-base",
                    currentRoute === item.title &&
                      "text-purple-600 font-semibold",
                  ])}
                  onClick={() => {
                    setCurrentRoute(item.title);
                    setShowSidebar(false);
                  }}
                >
                  {item.icon && <item.icon className="text-xl" />}
                  {item.title}
                </li>
              ))}
            </ul>
            <hr className="border-gray-200" />

            <ul className="flex flex-col gap-3">
              {addmore.map((item, index) => (
                <li
                  key={index}
                  className={classNames([
                    "flex items-center gap-2 text-gray-600 text-base",
                    currentRoute === item.title &&
                      "text-purple-600 font-semibold",
                  ])}
                  onClick={() => {
                    setCurrentRoute(settings.title);
                    setShowSidebar(true);
                  }}
                >
                  {item.icon && <item.icon className="text-xl" />}
                  {item.title}
                </li>
              ))}
            </ul>
            {/* Bottom profile + settings */}
            <div className="mt-auto flex justify-around pt-3 border-t border-gray-200">
              {settings && settings.icon && (
                <FaCircleInfo
                  className="text-2xl text-gray-300 hover:text-purple-600 cursor-pointer w-5 h-"
                  onClick={() => {
                    setCurrentRoute(settings.title);
                    setShowSidebar(true);
                  }}
                />
              )}
              {settings && settings.icon && (
                <MdLanguage
                  className="text-2xl text-gray-300 hover:text-purple-600 cursor-pointer w-5 h-"
                  onClick={() => {
                    setCurrentRoute(settings.title);
                    setShowSidebar(true);
                  }}
                />
              )}
              {settings && settings.icon && (
                <FiMoon
                  className="text-2xl text-gray-300 hover:text-purple-600 cursor-pointer w-5 h-"
                  onClick={() => {
                    setCurrentRoute(settings.title);
                    setShowSidebar(true);
                  }}
                />
              )}
              {settings && settings.icon && (
                <FiSettings
                  className="text-2xl text-gray-300 hover:text-purple-600 cursor-pointer w-5 h-"
                  onClick={() => {
                    setCurrentRoute(settings.title);
                    setShowSidebar(true);
                  }}
                />
              )}
              {settings && settings.icon && (
                <FiLogOut
                  className="text-2xl text-gray-300 hover:text-purple-600 cursor-pointer w-5 h-"
                  onClick={() => {
                    setCurrentRoute(settings.title);
                    setShowSidebar(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tabbar;

import React from "react";
import classNames from "classnames";
import styles from "./Navbar.module.css";

const Navbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
  const renderItem = (item, index) => (
    <li
      key={index}
      className={classNames([
        "text-gray-400 hover:text-gray-700 cursor-pointer font-medium tracking-wide text-sm flex items-center justify-center gap-1 px-2",
        currentRoute === item.title && item.section === "navigation"
          ? "text-blue-400 border-b-3 border-blue-400 bg-gradient-to-b from-white to-gray-100"
          : "",
        item.section === "actions" ? "w-18" : "w-25",
        currentRoute === item.title &&
          item.section === "logo" &&
          " text-gray-700",
      ])}
      onClick={() => setCurrentRoute(item.title)}
    >
      {item.showIcon && item.icon && (
        <item.icon
          className={classNames([
            "text-xl",
            currentRoute === item.title &&
              item.section === "actions" &&
              "text-blue-400 drop-shadow-sm ",
          ])}
        />
      )}

      {item.avatar && (
        <img
          src={item.avatar}
          alt={item.title}
          className={classNames([
            "h-8 w-8 rounded-full object-cover",
            currentRoute === item.title &&
              item.section === "settings" &&
              " border-3 border-blue-400 w-10 h-10",
          ])}
        />
      )}
      {/* {item.title === "settings" && <item.icon className={classNames([""])} />} */}
      {item.showTitle && <span className="leading-none">{item.title}</span>}
      {item.itemCount > 0 && (
        <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {item.itemCount}
        </span>
      )}
    </li>
  );

  const searchBar = navigationData.find((item) => item.section === "search");

  const sections = {
    logo: navigationData.filter((item) => item.section === "logo"),
    navigation: navigationData.filter((item) => item.section === "navigation"),
    actions: navigationData.filter((item) => item.section === "actions"),
    settings: navigationData.filter((item) => item.section === "settings"),
  };

  return (
    <nav className="hidden md:flex flex-row items-center justify-between px-8 h-18 bg-white w-full">
      {/* LOGO */}
      <ul className="flex flex-row  h-12">{sections.logo.map(renderItem)}</ul>

      {/* SEARCH */}
      <ul className="flex flex-row  h-12">
        {searchBar && searchBar.input && (
          <li className={styles.containerInput}>
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
          </li>
        )}
      </ul>

      {/* NAVIGATION */}
      <ul className="flex flex-row  h-12">
        {sections.navigation.map(renderItem)}
      </ul>

      {/* ACTIONS */}
      <ul className="flex flex-row  h-12">
        {sections.actions.map(renderItem)}
      </ul>

      {/* SETTINGS */}
      <ul className="flex flex-row  h-12">
        {sections.settings.map(renderItem)}
      </ul>
    </nav>
  );
};

export default Navbar;

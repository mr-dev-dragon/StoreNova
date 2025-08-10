import React from "react";
import classNames from "classnames";
import styles from "../../../styles/Tabbar.module.css";
import { FiMenu } from "react-icons/fi";

const TabbarMobile = ({
  getNavConfig,
  currentRoute,
  setCurrentRoute,
  setShowSidebar,
  SeeThroughMode = false, // default false
}) => {
  const fixedTabItems = ["Home", "Discover", "Cart", "Favorites"];

  const tabItems = getNavConfig.filter(
    (item) =>
      item.section === "navigation" ||
      (item.section === "actions" && fixedTabItems.includes(item.title))
  );

  // Common base class for buttons
  const baseBtnClass =
    "flex-1 cursor-pointer h-full flex flex-col items-center justify-center text-sm";

  return (
    <nav
      className={classNames([
        // Conditionally include shadow only if SeeThroughMode is false
        !SeeThroughMode && styles.navbarShadowTop,
        "flex md:hidden flex-row items-center justify-around px-2 h-16 fixed bottom-0 w-full text-2xl rounded-t-xl z-50",
        SeeThroughMode ? "bg-transparent" : "bg-white",
      ])}
    >
      {tabItems.map((item, index) => (
        <button
          key={index}
          className={classNames([
            baseBtnClass,
            SeeThroughMode
              ? "text-white" // white icons & text
              : "text-gray-400 hover:text-gray-700",
            // If current route, change text color only when NOT see-through mode
            !SeeThroughMode &&
              currentRoute === item.title &&
              "text-purple-600 font-semibold",
          ])}
          onClick={() => setCurrentRoute(item.title)}
          // Remove hover/focus styles if SeeThroughMode, so no color change on hover
          // We rely on CSS above, so no extra code needed
        >
          {item.icon && (
            <item.icon
              className={classNames(
                "text-xl mb-0.5",
                SeeThroughMode ? "text-white" : undefined
              )}
            />
          )}
          <span className="text-xs">{item.title}</span>
        </button>
      ))}

      {/* Menu button */}
      <button
        className={classNames([
          baseBtnClass,
          SeeThroughMode ? "text-white" : "text-gray-400 hover:text-gray-700",
        ])}
        onClick={() => setShowSidebar(true)}
      >
        <FiMenu
          className={classNames(
            "text-xl mb-0.5",
            SeeThroughMode && "text-white"
          )}
        />
        <span className="text-xs">More</span>
      </button>
    </nav>
  );
};

export default TabbarMobile;

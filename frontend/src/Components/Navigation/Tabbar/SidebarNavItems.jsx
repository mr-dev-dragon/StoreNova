import React from "react";
import classNames from "classnames";

const SidebarNavItems = ({
  getNavConfig,
  currentRoute,
  setCurrentRoute,
  setShowSidebar,
}) => {
  const navigationItems = getNavConfig.filter(
    (item) => item.section === "navigation"
  );

  return (
    <ul className="flex flex-col gap-3">
      {navigationItems.map((item, index) => (
        <li
          key={index}
          className={classNames([
            "flex items-center gap-2 text-gray-600 text-base",
            currentRoute === item.title && "text-purple-600 font-semibold",
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
  );
};

export default SidebarNavItems;

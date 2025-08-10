import React from "react";
import classNames from "classnames";
import {
  FiBookmark,
  FiBell,
  FiShield,
  FiFileText,
  FiHelpCircle,
  FiInfo,
} from "react-icons/fi";

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

const SidebarExtraItems = ({
  currentRoute,
  setCurrentRoute,
  setShowSidebar,
}) => {
  return (
    <ul className="flex flex-col gap-3">
      {addmore.map((item, index) => (
        <li
          key={index}
          className={classNames([
            "flex items-center gap-2 text-gray-600 text-base",
            currentRoute === item.title && "text-purple-600 font-semibold",
          ])}
          onClick={() => {
            setCurrentRoute(item.title);
            setShowSidebar(true);
          }}
        >
          {item.icon && <item.icon className="text-xl" />}
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default SidebarExtraItems;

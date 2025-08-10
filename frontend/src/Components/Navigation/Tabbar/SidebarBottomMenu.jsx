import React from "react";
import { FaInfoCircle } from "react-icons/fa"; // replaced here
import { MdLanguage } from "react-icons/md";
import { FiMoon, FiSettings, FiLogOut } from "react-icons/fi";

const SidebarBottomMenu = ({ setCurrentRoute }) => {
  const items = [
    { Icon: FaInfoCircle, title: "About" },
    { Icon: MdLanguage, title: "Language" },
    { Icon: FiMoon, title: "Theme" },
    { Icon: FiSettings, title: "Settings" },
    { Icon: FiLogOut, title: "Logout" },
  ];

  return (
    <div className="mt-auto flex justify-around pt-3 border-t border-gray-200">
      {items.map(({ Icon, title }, i) => (
        <Icon
          key={i}
          className="text-2xl text-gray-300 hover:text-purple-600 cursor-pointer w-5 h-"
          onClick={() => setCurrentRoute(title)}
          title={title}
        />
      ))}
    </div>
  );
};

export default SidebarBottomMenu;

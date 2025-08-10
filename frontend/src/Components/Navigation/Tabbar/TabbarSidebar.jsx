import React from "react";

import SidebarProfile from "./SidebarProfile";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";
import SidebarActionItems from "./SidebarActionItems";
import SidebarExtraItems from "./SidebarExtraItems";
import SidebarBottomMenu from "./SidebarBottomMenu";

const TabbarSidebar = ({
  getNavConfig,
  currentRoute,
  setCurrentRoute,
  setShowSidebar,
}) => {
  const profile = getNavConfig.find(
    (item) => item.section === "settings" && item.title === "Profile"
  );

  const logo = getNavConfig.find((item) => item.section === "logo");

  const searchBar = getNavConfig.find((item) => item.section === "search");

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 md:hidden"
      onClick={() => setShowSidebar(false)}
    >
      <div
        className="absolute left-0 top-0 h-full w-72 bg-white p-4 flex flex-col gap-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <SidebarProfile
          profile={profile}
          logo={logo}
          setCurrentRoute={setCurrentRoute}
        />
        <hr className="border-gray-200 mb-4" />
        {searchBar && searchBar.input && (
          <SidebarSearch
            placeholder={searchBar.placeholder}
            action={searchBar.action}
          />
        )}

        <SidebarNavItems
          getNavConfig={getNavConfig}
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
          setShowSidebar={setShowSidebar}
        />

        <hr className="border-gray-200" />

        <SidebarActionItems
          getNavConfig={getNavConfig}
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
          setShowSidebar={setShowSidebar}
        />

        <hr className="border-gray-200" />

        <SidebarExtraItems
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
          setShowSidebar={setShowSidebar}
        />

        <SidebarBottomMenu setCurrentRoute={setCurrentRoute} />
      </div>
    </div>
  );
};

export default TabbarSidebar;

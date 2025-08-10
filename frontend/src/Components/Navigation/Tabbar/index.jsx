import React, { useState } from "react";
import TabbarMobile from "./TabbarMobile";
import TabbarSidebar from "./TabbarSidebar";

const Tabbar = ({
  getNavConfig,
  currentRoute,
  setCurrentRoute,
  SeeThroughMode = false, // Default to false if not provided
}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <TabbarMobile
        getNavConfig={getNavConfig}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        setShowSidebar={setShowSidebar}
        SeeThroughMode={SeeThroughMode}
      />
      {showSidebar && (
        <TabbarSidebar
          getNavConfig={getNavConfig}
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
          setShowSidebar={setShowSidebar}
        />
      )}
    </>
  );
};

export default Tabbar;

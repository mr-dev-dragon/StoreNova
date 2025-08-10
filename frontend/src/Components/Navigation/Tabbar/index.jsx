import React, { useState } from "react";
import TabbarMobile from "./TabbarMobile";
import TabbarSidebar from "./TabbarSidebar";

const Tabbar = ({ getNavConfig, currentRoute, setCurrentRoute }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <TabbarMobile
        getNavConfig={getNavConfig}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        setShowSidebar={setShowSidebar}
        SeeThroughMode={true}
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

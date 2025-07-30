import Products from "../Components/Products/Products";
import Recommended from "../Components/Recommended/Recommended";
import { FaDev } from "react-icons/fa";

import useNavigation from "../Components/Navigation/hook/useNavigation";
import getNavConfig from "../Components/Navigation/data/navigation";
import Navbar from "../Components/Navigation/navbar";
import Tabbar from "../Components/Navigation/Tabbar";

const NavDemo = () => {
  const { currentRoute, setCurrentRoute } = useNavigation();

  return (
    <div className={"bg-gray-200 h-screen;"}>
      <Navbar
        getNavConfig={getNavConfig}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <Tabbar
        getNavConfig={getNavConfig}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <div className={"flex   text-5xl text-gray-300 "}>
        <Products />
        <Recommended />
      </div>
    </div>
  );
};

export default NavDemo;

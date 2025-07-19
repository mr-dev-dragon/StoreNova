import Products from "../Components/Products/Products";
import Recommended from "../Components/Recommended/Recommended";
import { FaDev } from "react-icons/fa";

import useNavigation from "../Components/Navigation/hook/useNavigation";
import navigationData from "../Components/Navigation/data/navigation";
import Navbar from "../Components/Navigation/navbar";
// import Tabbar from "../Components/Navigation/Tabbar";
import "./home.css";

const Home = () => {
  const { currentRoute, setCurrentRoute } = useNavigation();

  return (
    <div className={"bg-gray-200 h-screen;"}>
      <Navbar
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      {/* <Tabbar
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      /> */}
      <div className={"flex   text-5xl text-gray-300 "}>
        <Products />
        <Recommended />
      </div>
    </div>
  );
};

export default Home;

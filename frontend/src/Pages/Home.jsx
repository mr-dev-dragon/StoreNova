import Products from "../Components/Products/Products";
import Recommended from "../Components/Recommended/Recommended";
import { FaDev } from "react-icons/fa";
import { useState, useEffect } from "react";
import useNavigation from "../Components/Navigation/hook/useNavigation";
import navigationData from "../Components/Navigation/data/navigation";
import Navbar from "../Components/Navigation/navbar";
import Tabbar from "../Components/Navigation/Tabbar";
import Card from "../Components/Shared/Card";
import "./home.css";
import { AiOutlineFilter, AiOutlineClose } from "react-icons/ai";
import classNames from "classnames";
import data from "../db/db";
import { FiSidebar } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import PaginationWrapper from "../Components/Shared/PaginationWrapper";
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

const getRandomSuggestions = (count = 17) => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Home = () => {
  const [showFilters, setShowFilters] = useState(true);
  const { currentRoute, setCurrentRoute } = useNavigation();

  const showtheFSidebar = (value) => () => {
    setShowFilters(value);
  };

  const [suggestedItems, setSuggestedItems] = useState([]);
  const [animationKey, setAnimationKey] = useState(Date.now());

  useEffect(() => {
    // initial pick
    setSuggestedItems(getRandomSuggestions());
    setAnimationKey(Date.now());

    const interval = setInterval(() => {
      setSuggestedItems(getRandomSuggestions());
      setAnimationKey(Date.now()); // force re-render for animation
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={"bg-gray-100 h-screen;"}>
      <Navbar
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <Tabbar
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <div className="main-container flex flex-col md:flex-row h-full ">
        {/* Sidebar */}
        <aside
          className={classNames([
            "bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all  w-full",
            "transition-all duration-700 ease-in-out transform overflow-y-auto",
            "fixed md:relative top-0 left-0 z-20 md:z-auto",
            "bg-white border-r border-gray-200  m-4 mr-0",
            showFilters
              ? "translate-x-0 opacity-100 md:w-[19%] min-h-[120vh] fixed md:static relative"
              : "-translate-x-full opacity-0 md:w-0",
          ])}
        >
          <div className="min-h-[150vh] fixed md:static top-0 left-0 md:overflow-y-auto w-full max-w-xs  bg-white  rounded-xl space-y-6 divide-y divide-gray-200">
            <div className="p-6">
              {/* Category Filter */}

              <div className="space-y-3 pb-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Category
                </h3>
                <ul className="space-y-2">
                  {["Shoes", "T-Shirts", "Accessories", "Hoodies"].map(
                    (cat) => (
                      <li key={cat}>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            className="accent-purple-600"
                          />
                          {cat}
                        </label>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Price Filter */}
              <div className="space-y-3 py-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Price Range
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3 py-6">
                <h3 className="text-base font-semibold text-gray-900">Brand</h3>
                <ul className="space-y-2 max-h-40 overflow-auto pr-1">
                  {[
                    "Nike",
                    "Adidas",
                    "Puma",
                    "Reebok",
                    "New Balance",
                    "Converse",
                  ].map((brand) => (
                    <li key={brand}>
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" className="accent-purple-600" />
                        {brand}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Filter */}
              <div className="space-y-3 py-6]">
                <h3 className="text-base font-semibold text-gray-900">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "#000000",
                    "#ffffff",
                    "#f87171",
                    "#60a5fa",
                    "#34d399",
                    "#fbbf24",
                  ].map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-purple-500"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Suggested Items with Animation */}
            <div className="">
              <h3 className="text-base font-semibold p-6 text-gray-900 mb-3">
                Suggested Items
              </h3>
              <div
                className="overflow-hidden p-3"
                style={{ minHeight: "400px" }}
              >
                <motion.div key={animationKey} layout className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {suggestedItems.map((item, i) => (
                      <motion.div
                        key={i} // using index if item._id doesn't exist
                        custom={i}
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                      >
                        <Card item={item} classNameToPass="mb-3" row={true} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content  md:ml-64 */}
        <main className={classNames("flex-1 p-4 transition-margin-left")}>
          {/* Top Bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm flex items-center justify-between">
            <p className="text-sm text-gray-700">Showing 20 results</p>
            <div className="flex items-center gap-2">
              <button className="text-sm text-purple-600 font-medium hover:underline">
                Sort by Price
              </button>
              <button
                className="md:hidden flex items-center gap-1 text-sm text-gray-700 border px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setShowFilters(true)}
              >
                <AiOutlineFilter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={showtheFSidebar(!showFilters)}
            className="fixed bottom-4 right-4 z-30 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition"
          >
            {showFilters ? <RxCross2 size={20} /> : <FiSidebar size={20} />}
          </button>

          {/* Cards Grid */}
          <PaginationWrapper data={data} CardComponent={Card} />
        </main>
      </div>
    </div>
  );
};

export default Home;

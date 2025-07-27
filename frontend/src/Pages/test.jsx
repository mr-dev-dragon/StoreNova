import { useState, useEffect, useRef, useMemo } from "react";
import useNavigation from "../Components/Navigation/hook/useNavigation";
import navigationData from "../Components/Navigation/data/navigation";
import Navbar from "../Components/Navigation/navbar";
import Tabbar from "../Components/Navigation/Tabbar";
import Card from "../Components/Shared/Card";
import "./test.css";
import { AiOutlineFilter, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import classNames from "classnames";
import rawData from "../db/db";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const getRandomSuggestions = (count = 6) => {
  const shuffled = [...rawData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const test = () => {
  const [showFilters, setShowFilters] = useState(true);
  const { currentRoute, setCurrentRoute } = useNavigation();
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortOrder, setSortOrder] = useState("asc");

  const suggestionsRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowSuggestions(true);
      },
      { threshold: 0.1 }
    );
    if (suggestionsRef.current) observer.observe(suggestionsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showSuggestions) return;
    setSuggestedItems(getRandomSuggestions());
    const interval = setInterval(() => {
      setSuggestedItems(getRandomSuggestions());
    }, 15000);
    return () => clearInterval(interval);
  }, [showSuggestions]);

  const handleCheckboxChange = (value, setter, current) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const filteredData = useMemo(() => {
    return rawData
      .filter((item) => {
        const cat = item.category || "";
        return categoryFilter.length ? categoryFilter.includes(cat) : true;
      })
      .filter((item) => {
        const brand = item.brand || "";
        return brandFilter.length ? brandFilter.includes(brand) : true;
      })
      .filter((item) => {
        const color = (item.color || "").toLowerCase();
        return colorFilter.length ? colorFilter.includes(color) : true;
      })
      .filter((item) => {
        const price = typeof item.price === "number" ? item.price : 0;
        return price >= minPrice && price <= maxPrice;
      })
      .sort((a, b) => {
        const aPrice = typeof a.price === "number" ? a.price : 0;
        const bPrice = typeof b.price === "number" ? b.price : 0;
        return sortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice;
      });
  }, [categoryFilter, brandFilter, colorFilter, minPrice, maxPrice, sortOrder]);

  return (
    <div className="bg-gray-100 h-screen">
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

      <div className="main-container flex flex-col md:flex-row h-full">
        {showFilters && (
          <aside
            className={classNames([
              "bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all",
              "duration-700 ease-in-out transform overflow-y-auto",
              "fixed md:relative top-0 left-0 z-20 md:z-auto",
              "border-r border-gray-200 m-4 mr-0 md:w-[19%]",
            ])}
          >
            <div className="max-w-xs bg-white rounded-xl space-y-6 divide-y divide-gray-200 p-6">
              <fieldset>
                <legend className="text-base font-semibold text-gray-900 mb-2">
                  Category
                </legend>
                <ul className="space-y-2">
                  {["Shoes", "T-Shirts", "Accessories", "Hoodies"].map(
                    (cat) => (
                      <li key={cat}>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            className="accent-purple-600"
                            checked={categoryFilter.includes(cat)}
                            onChange={() =>
                              handleCheckboxChange(
                                cat,
                                setCategoryFilter,
                                categoryFilter
                              )
                            }
                          />
                          {cat}
                        </label>
                      </li>
                    )
                  )}
                </ul>
              </fieldset>

              <fieldset>
                <legend className="text-base font-semibold text-gray-900 mb-2">
                  Price Range
                </legend>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice === 0 ? "" : minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice === Infinity ? "" : maxPrice}
                    onChange={(e) =>
                      setMaxPrice(Number(e.target.value) || Infinity)
                    }
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-base font-semibold text-gray-900 mb-2">
                  Brand
                </legend>
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
                        <input
                          type="checkbox"
                          className="accent-purple-600"
                          checked={brandFilter.includes(brand)}
                          onChange={() =>
                            handleCheckboxChange(
                              brand,
                              setBrandFilter,
                              brandFilter
                            )
                          }
                        />
                        {brand}
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>

              <fieldset>
                <legend className="text-base font-semibold text-gray-900 mb-2">
                  Color
                </legend>
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
                      onClick={() =>
                        handleCheckboxChange(
                          color.toLowerCase(),
                          setColorFilter,
                          colorFilter
                        )
                      }
                      className={classNames(
                        "w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-purple-500",
                        colorFilter.includes(color.toLowerCase()) &&
                          "ring-2 ring-purple-600"
                      )}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </fieldset>

              <div ref={suggestionsRef}>
                <h3 className="text-base font-semibold text-gray-900 mb-3 pt-6">
                  Suggested Items
                </h3>
                <div className="overflow-hidden min-h-[200px]">
                  {showSuggestions && (
                    <motion.div layout className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {suggestedItems.map((item, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                          >
                            <Card
                              item={{ ...item, lazy: true }}
                              classNameToPass="mb-3"
                              row
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        )}

        <main className="flex-1 p-4">
          <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {filteredData.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                className="text-sm text-purple-600 font-medium hover:underline"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                Sort by Price (
                {sortOrder === "asc" ? "Low to High" : "High to Low"})
              </button>
              <button
                className="md:hidden flex items-center gap-1 text-sm text-gray-700 border px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setShowFilters(true)}
              >
                <AiOutlineFilter className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="fixed bottom-4 right-4 z-30 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition"
          >
            {showFilters ? (
              <AiOutlineClose size={20} />
            ) : (
              <AiOutlineMenu size={20} />
            )}
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredData.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default test;

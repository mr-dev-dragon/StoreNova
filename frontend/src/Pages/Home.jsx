import { useState, useEffect, useMemo, useRef } from "react";
import useNavigation from "../Components/Navigation/hook/useNavigation";
import navigationData from "../Components/Navigation/data/navigation";
import Navbar from "../Components/Navigation/navbar";
import Tabbar from "../Components/Navigation/Tabbar";
import Card from "../Components/Shared/Card";
import "./home.css";
import { AiOutlineFilter, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import classNames from "classnames";
import rawData from "../db/db";
import PaginationWrapper from "../Components/Shared/PaginationWrapper";
import FilterSidebar from "../Components/Shared/FilterSidebar";
import SortBar from "../Components/Shared/SortBar";

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

const Home = () => {
  const [showFilters, setShowFilters] = useState(true);
  const { currentRoute, setCurrentRoute } = useNavigation();

  const [suggestedItems, setSuggestedItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({});
  const [titleSearch, setTitleSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortOrder, setSortOrder] = useState("asc");

  const [filterKeys, setFilterKeys] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const suggestionsRef = useRef();

  useEffect(() => {
    const keys = Object.keys(rawData[0] || {}).filter(
      (k) => !["img", "id", "prevPrice", "newPrice"].includes(k)
    );
    setFilterKeys(keys);

    const valuesObj = {};
    keys.forEach((k) => {
      const values = rawData
        .map((item) => item[k])
        .filter((v) => v !== undefined && v !== null)
        .map((v) => (typeof v === "string" ? v.toLowerCase() : v));
      valuesObj[k] = [...new Set(values)];
    });
    setFilterValues(valuesObj);
  }, []);

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

  const filteredData = useMemo(() => {
    try {
      return rawData
        .filter((item) => {
          if (titleSearch) {
            const title = (item.title || "").toLowerCase();
            if (!title.includes(titleSearch.toLowerCase())) return false;
          }
          return filterKeys.every((key) => {
            if (key === "title") return true;
            const val = (item[key] || "").toString().toLowerCase();
            if (selectedFilters[key]?.length) {
              return selectedFilters[key].includes(val);
            }
            return true;
          });
        })
        .filter((item) => {
          const price = parseFloat(item.newPrice) || 0;
          return (
            price >= minPrice &&
            price <= (maxPrice === Infinity ? price : maxPrice)
          );
        })
        .sort((a, b) => {
          const aPrice = parseFloat(a.newPrice) || 0;
          const bPrice = parseFloat(b.newPrice) || 0;
          return sortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice;
        });
    } catch (err) {
      console.error("filteredData error:", err);
      return [];
    }
  }, [selectedFilters, minPrice, maxPrice, sortOrder, filterKeys, titleSearch]);

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
          <FilterSidebar
            showSuggestions={showSuggestions}
            suggestionsRef={suggestionsRef}
            suggestedItems={suggestedItems}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            filterKeys={filterKeys}
            filterValues={filterValues}
            titleSearch={titleSearch}
            setTitleSearch={setTitleSearch}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            variants={variants}
          />
        )}

        <main className="flex-1 p-4">
          <SortBar
            filteredDataLength={filteredData.length}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setShowFilters={setShowFilters}
          />

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

          {/* Main Product List with AnimatePresence */}
          <PaginationWrapper
            data={filteredData}
            CardComponent={({ item }) => (
              <Card item={{ ...item, lazy: true }} />
            )}
            variants={variants}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;

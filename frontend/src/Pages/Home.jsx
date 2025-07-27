import { useState, useEffect, useMemo, useRef } from "react";
import useNavigation from "../Components/Navigation/hook/useNavigation";
import navigationData from "../Components/Navigation/data/navigation";
import Navbar from "../Components/Navigation/navbar";
import Tabbar from "../Components/Navigation/Tabbar";
import Card from "../Components/Shared/Card";
import "./home.css";
import { AiOutlineFilter, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import rawData from "../db/db";
import PaginationWrapper from "../Components/Shared/PaginationWrapper";
import FilterSidebar from "../Components/Shared/FilterSidebar";
import SortBar from "../Components/Shared/SortBar";
import EventBlock from "../Components/Shared/EventBlock";
import classNames from "classnames";
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
  const filterConfig = {
    title: { type: "text", label: "Title" },
    color: { type: "color", label: "Color" },
    star: { type: "star", label: "Rating" },
    reviews: { type: "number", label: "Reviews" },
    company: { type: "string", label: "Brand" },
    category: { type: "string", label: "Category" },
  };

  const sortConfigOptions = [
    { key: "newPrice", label: "Price", type: "number" },
    { key: "star", label: "Rating", type: "number" },
    { key: "reviews", label: "Reviews", type: "number" },
    { key: "title", label: "Title", type: "string" },
  ];

  const [sortConfig, setSortConfig] = useState({
    key: "newPrice",
    order: "asc",
  });

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

  // ✅ filteredData FIRST
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

  // ✅ sortedData AFTER filteredData
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const { key, order } = sortConfig;

    return [...filteredData].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

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
              // Positioning
              "fixed md:relative top-0 left-0 z-30 md:z-auto",

              // Full height
              "h-screen md:h-auto",

              // Width
              "w-72 md:w-64 lg:w-72",

              // Style
              "bg-white border-r border-gray-200 shadow-lg rounded-none md:rounded-lg",

              // Padding & scroll
              "p-4 overflow-y-auto",

              // Transition
              "transition-all duration-300 ease-in-out",

              // Hover effect
              "hover:shadow-xl",
            ])}
          >
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
              config={filterConfig}
              ignoreKeys={["img", "id", "prevPrice", "newPrice"]}
            />
          </aside>
        )}

        <main className="flex-1 p-4">
          {/* SortBar using dynamic config */}
          <SortBar
            filteredDataLength={sortedData.length}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            setShowFilters={setShowFilters}
            config={sortConfigOptions}
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
          {/* Paginated, animated product list */}
          <PaginationWrapper
            data={sortedData}
            CardComponent={({ item }) => (
              <Card item={{ ...item, lazy: true }} />
            )}
            variants={variants}
          />

          <EventBlock
            type="trending"
            layout="row"
            data={[
              { name: "Porsche 911 Accessories" },
              { name: "Summer Deals" },
              { name: "Top Rated Watches" },
            ]}
            variants={variants}
          />
          <EventBlock
            type="promo"
            layout="row"
            data={[
              {
                title: "Big Sale!",
                description: "Up to 50% off on select items.",
              },
              { title: "Free Shipping", description: "On orders over $100." },
            ]}
            variants={variants}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;

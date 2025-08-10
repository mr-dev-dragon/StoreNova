import { useState, useEffect, useMemo, useRef } from "react";
import useNavigation from "../Components/Navigation/hook/useNavigation";
import getNavConfig from "../Components/Navigation/data/getNavConfig";
import Navbar from "../Components/Navigation/navbar";
import Tabbar from "../Components/Navigation/Tabbar";
import Card from "../Components/common/Card";
import PaginationWrapper from "../Components/common/PaginationWrapper";
import FilterSidebar from "../Components/filterSidebar/FilterSidebar";
import SortBar from "../Components/common/SortBar";
import EventBlock from "../Components/filterSidebar/EventBlock";
import FooterBar from "../Components/footer/FooterBar";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import rawData from "../db/db";
import "../styles/home.css";
import { useFavorites } from "../context/FavoritesContext";
import HeroSection from "../Components/HeroSection/index";

// Star filtering helper — checks for star range including halves
function filterByStar(data, filterStarValue) {
  if (!filterStarValue) return data;

  return data.filter((item) => {
    const star = parseFloat(item.star) || 0;
    // Accept items with star rating >= filterStarValue - 0.5 and <= filterStarValue + 0.5
    return star >= filterStarValue - 0.5 && star <= filterStarValue + 0.5;
  });
}

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const getRandomSuggestions = (count = 6) =>
  [...rawData].sort(() => Math.random() - 0.5).slice(0, count);

const FILTER_CONFIG = {
  title: { type: "text", label: "Title" },
  color: { type: "color", label: "Color" },
  star: { type: "star", label: "Rating" },
  reviews: { type: "number", label: "Reviews" },
  company: { type: "string", label: "Brand" },
  category: { type: "string", label: "Category" },
};

const SORT_OPTIONS = [
  { key: "newPrice", label: "Price", type: "number" },
  { key: "star", label: "Rating", type: "number" },
  { key: "reviews", label: "Reviews", type: "number" },
  { key: "title", label: "Title", type: "string" },
];

const Home = () => {
  const { state } = useFavorites();
  const navData = getNavConfig(state);
  const { currentRoute, setCurrentRoute } = useNavigation();

  const [sortConfig, setSortConfig] = useState({
    key: "newPrice",
    order: "asc",
  });
  const [showFilters, setShowFilters] = useState(true);
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [titleSearch, setTitleSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [filterKeys, setFilterKeys] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const suggestionsRef = useRef();

  // NEW: SeeThroughMode state and scroll handler
  const [SeeThroughMode, setSeeThroughMode] = useState(true);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > innerHeight) {
        setSeeThroughMode(false);
      } else {
        setSeeThroughMode(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const keys = Object.keys(rawData[0] || {}).filter(
      (k) => !["img", "id", "prevPrice", "newPrice"].includes(k)
    );
    setFilterKeys(keys);

    const values = keys.reduce((acc, key) => {
      const uniqueValues = new Set(
        rawData
          .map((item) => item[key])
          .filter((v) => v !== undefined && v !== null)
          .map((v) => (typeof v === "string" ? v.toLowerCase() : v))
      );
      acc[key] = Array.from(uniqueValues);
      return acc;
    }, {});
    setFilterValues(values);
  }, []);

  useEffect(() => {
    if (!suggestionsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowSuggestions(true),
      { threshold: 0.1 }
    );
    observer.observe(suggestionsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showSuggestions) return;

    setSuggestedItems(getRandomSuggestions());
    const intervalId = setInterval(
      () => setSuggestedItems(getRandomSuggestions()),
      15000
    );
    return () => clearInterval(intervalId);
  }, [showSuggestions]);

  // First filter raw data by search and filters except star & price
  const filteredData = useMemo(() => {
    try {
      return rawData
        .filter((item) => {
          // Title search
          if (
            titleSearch &&
            !(item.title?.toLowerCase() || "").includes(
              titleSearch.toLowerCase()
            )
          )
            return false;

          // Other filters except star
          return filterKeys.every((key) => {
            if (key === "title" || key === "star") return true;
            const value = (item[key] || "").toString().toLowerCase();
            return (
              !selectedFilters[key]?.length ||
              selectedFilters[key].includes(value)
            );
          });
        })
        .filter((item) => {
          // Price filter
          const price = parseFloat(item.newPrice) || 0;
          return (
            price >= minPrice &&
            price <= (maxPrice === Infinity ? price : maxPrice)
          );
        });
    } catch {
      return [];
    }
  }, [selectedFilters, minPrice, maxPrice, filterKeys, titleSearch]);

  // Then apply star filter on the filtered data
  const filteredByStar = useMemo(() => {
    const starFilterValue = selectedFilters.star || 0;
    return filterByStar(filteredData, starFilterValue);
  }, [filteredData, selectedFilters.star]);

  // Finally apply sorting on filtered + star filtered data
  const sortedData = useMemo(() => {
    const { key, order } = sortConfig;
    if (!key) return filteredByStar;
    return [...filteredByStar].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredByStar, sortConfig]);

  const [links, setLinks] = useState([
    { label: "Privacy Policy", active: false },
    { label: "Terms of Service", active: false },
    { label: "Contact Us", active: false },
  ]);

  const handleLinkClick = (clickedLink) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.label === clickedLink.label
          ? { ...link, active: true }
          : { ...link, active: false }
      )
    );
  };

  return (
    <>
      <HeroSection />

      <div className="h-screen bg-gray-100">
        <Navbar
          getNavConfig={navData}
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
          SeeThroughMode={SeeThroughMode}
        />
        <Tabbar
          getNavConfig={navData}
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
          SeeThroughMode={SeeThroughMode}
        />

        <div className="main-container flex  flex-col md:flex-row">
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
              variants={animationVariants}
              config={FILTER_CONFIG}
              ignoreKeys={["img", "id", "prevPrice", "newPrice"]}
            />
          )}

          <main className="flex-1 p-4">
            <SortBar
              filteredDataLength={sortedData.length}
              sortConfig={sortConfig}
              setSortConfig={setSortConfig}
              setShowFilters={setShowFilters}
              config={SORT_OPTIONS}
            />
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="fixed bottom-4 right-4 z-30 rounded-full bg-purple-600 p-2 text-white shadow-lg transition hover:bg-purple-700"
              aria-label={showFilters ? "Close filters" : "Open filters"}
            >
              {showFilters ? (
                <AiOutlineClose size={20} />
              ) : (
                <AiOutlineMenu size={20} />
              )}
            </button>
            <PaginationWrapper
              data={sortedData}
              CardComponent={({ item }) => (
                <Card item={{ ...item, lazy: true }} />
              )}
              variants={animationVariants}
            />
            <EventBlock
              type="trending"
              layout="row"
              data={[
                { name: "Porsche 911 Accessories" },
                { name: "Summer Deals" },
                { name: "Top Rated Watches" },
              ]}
              variants={animationVariants}
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
              variants={animationVariants}
            />
          </main>
        </div>
        <footer className="pt-4 pb-4">
          <FooterBar links={links} onLinkClick={handleLinkClick} />
        </footer>
      </div>
    </>
  );
};

export default Home;

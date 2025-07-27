import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import Card from "./Card";

const handleGenericCheckboxChange = (
  value,
  key,
  selectedFilters,
  setFilters
) => {
  const updated = selectedFilters[key]?.includes(value)
    ? selectedFilters[key].filter((v) => v !== value)
    : [...(selectedFilters[key] || []), value];
  setFilters((prev) => ({ ...prev, [key]: updated }));
};

const detectKeyType = (data, key) => {
  const sample = data.find((d) => d[key] !== undefined)?.[key];
  if (typeof sample === "number") {
    if (key === "star") return "star";
    return "number";
  }
  if (typeof sample === "string") {
    if (sample.startsWith("#")) return "color";
    if (key === "title") return "text";
    return "string";
  }
  return "string";
};

const FilterSidebar = ({
  showSuggestions,
  suggestionsRef,
  suggestedItems,
  setSelectedFilters,
  selectedFilters,
  filterKeys,
  filterValues,
  titleSearch,
  setTitleSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  variants,
}) => {
  return (
    <aside
      className={classNames([
        "bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all",
        "duration-700 ease-in-out transform overflow-y-auto",
        "fixed md:relative top-0 left-0 z-20 md:z-auto",
        "border-r border-gray-200 m-4 mr-0 md:w-[19%]",
      ])}
    >
      <div className="max-w-xs bg-white rounded-xl space-y-6 divide-y divide-gray-200 p-6">
        {filterKeys.map((key) => {
          const type = detectKeyType(Object.values(filterValues), key);
          const values = filterValues[key] || [];

          if (type === "color") {
            return (
              <fieldset key={key}>
                <legend className="text-base font-semibold mb-2 capitalize">
                  {key}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {values.map((color) => (
                    <div
                      key={color}
                      onClick={() =>
                        handleGenericCheckboxChange(
                          color,
                          key,
                          selectedFilters,
                          setSelectedFilters
                        )
                      }
                      className={classNames(
                        "w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-purple-500",
                        selectedFilters[key]?.includes(color) &&
                          "ring-2 ring-purple-600"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </fieldset>
            );
          }

          if (type === "text" && key === "title") {
            return (
              <fieldset key={key}>
                <legend className="text-base font-semibold mb-2 capitalize">
                  Search {key}
                </legend>
                <input
                  type="text"
                  value={titleSearch}
                  onChange={(e) => setTitleSearch(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                  placeholder="Search by title..."
                />
              </fieldset>
            );
          }

          return (
            <fieldset key={key}>
              <legend className="text-base font-semibold mb-2 capitalize">
                {key}
              </legend>
              <ul className="space-y-2 max-h-40 overflow-auto pr-1">
                {values.map((val) => (
                  <li key={val}>
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-purple-600"
                        checked={selectedFilters[key]?.includes(val)}
                        onChange={() =>
                          handleGenericCheckboxChange(
                            val,
                            key,
                            selectedFilters,
                            setSelectedFilters
                          )
                        }
                      />
                      {val}
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          );
        })}

        {/* Price Filter */}
        <fieldset>
          <legend className="text-base font-semibold mb-2">Price Range</legend>
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
                setMaxPrice(e.target.value ? Number(e.target.value) : Infinity)
              }
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </fieldset>

        {/* Suggestions */}
        <div ref={suggestionsRef}>
          <h3 className="text-base font-semibold mb-3 pt-6">Suggested Items</h3>
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
                      <Card item={{ ...item, lazy: true }} row />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;

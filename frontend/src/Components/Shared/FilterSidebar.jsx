// FilterSidebar.jsx
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import Card from "./Card";

// Utility to handle checkbox toggling in filters
const handleCheckboxChange = (value, key, selectedFilters, setFilters) => {
  const updated = selectedFilters[key]?.includes(value)
    ? selectedFilters[key].filter((v) => v !== value)
    : [...(selectedFilters[key] || []), value];
  setFilters((prev) => ({ ...prev, [key]: updated }));
};

// Detect input type fallback if no config provided
const detectKeyType = (data, key) => {
  const sample = data.find((d) => d[key] !== undefined)?.[key];
  if (typeof sample === "number") {
    if (key === "star") return "star";
    if (key === "reviews") return "number"; // treat reviews count as number
    return "number";
  }
  if (typeof sample === "string") {
    if (sample.startsWith("#")) return "color";
    if (key === "title") return "text";
    if (key === "reviews") return "text"; // reviews could be text, fallback
    return "string";
  }
  return "string";
};

// Subcomponents for different filter types

const ColorSelector = ({
  values,
  keyName,
  selectedFilters,
  setSelectedFilters,
}) => (
  <div className="flex flex-wrap gap-2">
    {values.map((color) => (
      <div
        key={color}
        onClick={() =>
          handleCheckboxChange(
            color,
            keyName,
            selectedFilters,
            setSelectedFilters
          )
        }
        className={classNames(
          "w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-purple-500",
          selectedFilters[keyName]?.includes(color) && "ring-2 ring-purple-600"
        )}
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

const CheckboxGroup = ({
  values,
  keyName,
  selectedFilters,
  setSelectedFilters,
}) => (
  <ul className="space-y-2 max-h-40 overflow-auto pr-1">
    {values.map((val) => (
      <li key={val}>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            className="accent-purple-600"
            checked={selectedFilters[keyName]?.includes(val)}
            onChange={() =>
              handleCheckboxChange(
                val,
                keyName,
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
);

const TextInput = ({ label, value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
  />
);

const PriceRange = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => (
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
);

const SuggestionBlock = ({
  showSuggestions,
  suggestionsRef,
  suggestedItems,
  variants,
}) => (
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
);

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
  config = {}, // config: { keyName: { type, label, ... } }
  ignoreKeys = ["img", "id", "prevPrice", "newPrice"],
}) => {
  // Filter keys dynamically, excluding ignoreKeys
  const filteredKeys = filterKeys.filter((k) => !ignoreKeys.includes(k));

  // Returns input type for key, overridden by config
  const getInputType = (key) => {
    if (config[key]?.type) return config[key].type;
    return detectKeyType(Object.values(filterValues), key);
  };

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
        {filteredKeys.map((key) => {
          const type = getInputType(key);
          const label = config[key]?.label || key;
          const values = filterValues[key] || [];

          if (type === "color") {
            return (
              <fieldset key={key}>
                <legend className="text-base font-semibold mb-2 capitalize">
                  {label}
                </legend>
                <ColorSelector
                  values={values}
                  keyName={key}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              </fieldset>
            );
          }

          if (type === "text" && key === "title") {
            return (
              <fieldset key={key}>
                <legend className="text-base font-semibold mb-2 capitalize">
                  Search {label}
                </legend>
                <TextInput
                  value={titleSearch}
                  onChange={(e) => setTitleSearch(e.target.value)}
                  placeholder={`Search by ${label.toLowerCase()}...`}
                />
              </fieldset>
            );
          }

          if (type === "star") {
            // example: show star rating filter as checkboxes from 1 to 5
            const starOptions = [1, 2, 3, 4, 5];
            return (
              <fieldset key={key}>
                <legend className="text-base font-semibold mb-2 capitalize">
                  {label}
                </legend>
                <CheckboxGroup
                  values={starOptions.map(String)}
                  keyName={key}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              </fieldset>
            );
          }

          if (type === "number" || type === "string") {
            // render as checkbox group
            return (
              <fieldset key={key}>
                <legend className="text-base font-semibold mb-2 capitalize">
                  {label}
                </legend>
                <CheckboxGroup
                  values={values}
                  keyName={key}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              </fieldset>
            );
          }

          // default fallback, render nothing
          return null;
        })}

        {/* Price Filter */}
        <fieldset>
          <legend className="text-base font-semibold mb-2">Price Range</legend>
          <PriceRange
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </fieldset>

        {/* Suggestions */}
        <SuggestionBlock
          showSuggestions={showSuggestions}
          suggestionsRef={suggestionsRef}
          suggestedItems={suggestedItems}
          variants={variants}
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;

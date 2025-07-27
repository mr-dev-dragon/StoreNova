// FilterSidebar.jsx
import { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import EventBlock from "./EventBlock"; // ✅ New Component for suggestions and events

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
    if (key === "reviews") return "number";
    return "number";
  }
  if (typeof sample === "string") {
    if (sample.startsWith("#")) return "color";
    if (key === "title") return "text";
    if (key === "reviews") return "text";
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
  config = {},
  ignoreKeys = ["img", "id", "prevPrice", "newPrice"],
}) => {
  const filteredKeys = filterKeys.filter((k) => !ignoreKeys.includes(k));

  const getInputType = (key) => {
    if (config[key]?.type) return config[key].type;
    return detectKeyType(Object.values(filterValues), key);
  };

  return (
    <div className="bg-white rounded-xl space-y-6 divide-y divide-gray-200 p-6">
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
              <div className="h-2"></div>
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
              <div className="h-2"></div>
            </fieldset>
          );
        }

        if (type === "star") {
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
              <div className="h-2"></div>
            </fieldset>
          );
        }

        if (type === "number" || type === "string") {
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
              <div className="h-2"></div>
            </fieldset>
          );
        }

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
        <div className="h-2"></div>
      </fieldset>
      <fieldset>
        <legend className="text-base font-semibold mb-2 flex flex-row">
          events
        </legend>
        <EventBlock
          type="trending"
          layout="sidebar"
          data={[
            { name: "Porsche 911 Accessories" },
            { name: "Summer Deals" },
            { name: "Top Rated Watches" },
          ]}
          variants={variants}
        />

        <div className="h-2"></div>
      </fieldset>
    </div>
  );
};

export default FilterSidebar;

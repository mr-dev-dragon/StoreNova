import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import EventBlock from "./EventBlock";
import StarInput from "./input/StarInput"; // <-- updated star component

const handleCheckboxChange = (value, key, selectedFilters, setFilters) => {
  setFilters((prev) => {
    const current = prev[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    return { ...prev, [key]: updated };
  });
};

const detectKeyType = (data, key) => {
  const sample = data.find((item) => item[key] !== undefined)?.[key];
  if (typeof sample === "number") return key === "star" ? "star" : "number";
  if (typeof sample === "string") {
    if (sample.startsWith("#")) return "color";
    return key === "title" || key === "reviews" ? "text" : "string";
  }
  return "string";
};

const ColorSelector = ({
  values,
  keyName,
  selectedFilters,
  setSelectedFilters,
}) => (
  <div className="flex flex-wrap gap-2">
    {values.map((color) => {
      const isSelected = selectedFilters[keyName]?.includes(color);
      return (
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
            isSelected && "ring-2 ring-purple-600"
          )}
          style={{ backgroundColor: color }}
        />
      );
    })}
  </div>
);

const CheckboxGroup = ({
  values,
  keyName,
  selectedFilters,
  setSelectedFilters,
}) => (
  <ul className="max-h-40 space-y-2 overflow-auto pr-1">
    {values.map((val) => {
      const isChecked = selectedFilters[keyName]?.includes(val);
      return (
        <li key={val}>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="accent-purple-600"
              checked={isChecked}
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
      );
    })}
  </ul>
);

const TextInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
  />
);

const PriceRange = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => (
  <div className="flex items-center gap-2">
    <input
      type="number"
      placeholder="Min"
      value={minPrice || ""}
      onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
      className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
    />
    <span className="text-gray-400">-</span>
    <input
      type="number"
      placeholder="Max"
      value={maxPrice === Infinity ? "" : maxPrice}
      onChange={(e) =>
        setMaxPrice(e.target.value ? Number(e.target.value) : Infinity)
      }
      className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
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
  const filteredKeys = filterKeys.filter((key) => !ignoreKeys.includes(key));

  const getInputType = (key) =>
    config[key]?.type || detectKeyType(Object.values(filterValues), key);

  return (
    <div className=" bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm space-y-6 divide-y divide-gray-200 mt-4 ml-4 sm:w-[142px] md:w-[170px] lg:w-[227px] xl:w-[284px] 2xl:w-[340px]">
      {filteredKeys.map((key) => {
        const type = getInputType(key);
        const label = config[key]?.label || key;
        const values = filterValues[key] || [];

        if (type === "color") {
          return (
            <fieldset key={key} className="pb-4">
              <legend className="mb-2 text-base font-semibold capitalize">
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
            <fieldset key={key} className="pb-4">
              <legend className="mb-2 text-base font-semibold capitalize">
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
          // Convert stored star filter value to number or 0
          const currentStarValue = selectedFilters[key]
            ? Number(selectedFilters[key])
            : 0;

          return (
            <fieldset key={key} className="p-4">
              <legend className="mb-2 text-base font-semibold capitalize">
                {label}
              </legend>
              <StarInput
                maxStars={5}
                value={currentStarValue}
                onChange={(value) => {
                  setSelectedFilters((prev) => {
                    if (value === 0) {
                      const newFilters = { ...prev };
                      delete newFilters[key];
                      return newFilters;
                    }
                    // Store star filter as number
                    return { ...prev, [key]: value };
                  });
                }}
              />
            </fieldset>
          );
        }

        if (type === "number" || type === "string") {
          return (
            <fieldset key={key} className="pb-4">
              <legend className="mb-2 text-base font-semibold capitalize">
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

        return null;
      })}

      <fieldset className="pb-4">
        <legend className="mb-2 text-base font-semibold">Price Range</legend>
        <PriceRange
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </fieldset>

      <fieldset className="pb-4">
        <legend className="mb-2 flex flex-row text-base font-semibold">
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
      </fieldset>
    </div>
  );
};

export default FilterSidebar;

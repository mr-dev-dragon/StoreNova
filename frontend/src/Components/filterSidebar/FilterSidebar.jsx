import React from "react";
import FilterSection from "./FilterSection";
import FilterInputRenderer from "./FilterInputRenderer";
import SuggestionsBlock from "./SuggestionsBlock";
import PriceRangeInput from "../common/input/PriceRangeInput";
import EventsBlockWrapper from "./EventsBlockWrapper";

const detectKeyType = (data, key) => {
  const sample = data.find((item) => item[key] !== undefined)?.[key];
  if (typeof sample === "number") return key === "star" ? "star" : "number";
  if (typeof sample === "string") {
    if (sample.startsWith("#")) return "color";
    return key === "title" || key === "reviews" ? "text" : "string";
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
  config = {},
  ignoreKeys = ["img", "id", "prevPrice", "newPrice"],
}) => {
  const filteredKeys = filterKeys.filter((key) => !ignoreKeys.includes(key));
  const getInputType = (key) =>
    config[key]?.type || detectKeyType(Object.values(filterValues), key);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm space-y-6 divide-y divide-gray-200 mt-4 ml-4 sm:w-[142px] md:w-[170px] lg:w-[227px] xl:w-[284px] 2xl:w-[340px]">
      {filteredKeys.map((key) => {
        const type = getInputType(key);
        const label = config[key]?.label || key;
        const values = filterValues[key] || [];

        return (
          <FilterSection
            key={key}
            label={
              type === "text" && key === "title" ? `Search ${label}` : label
            }
            className={type === "star" ? "p-4" : ""}
          >
            <FilterInputRenderer
              type={type}
              keyName={key}
              label={label}
              values={values}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              titleSearch={titleSearch}
              setTitleSearch={setTitleSearch}
            />
            {/* Attach suggestions only to Search input */}
            {type === "text" && key === "title" && (
              <SuggestionsBlock
                showSuggestions={showSuggestions}
                suggestionsRef={suggestionsRef}
                suggestedItems={suggestedItems}
              />
            )}
          </FilterSection>
        );
      })}

      <FilterSection label="Price Range">
        <PriceRangeInput
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </FilterSection>

      <EventsBlockWrapper
        data={[
          { name: "Porsche 911 Accessories" },
          { name: "Summer Deals" },
          { name: "Top Rated Watches" },
        ]}
        variants={variants}
      />
    </div>
  );
};

export default FilterSidebar;

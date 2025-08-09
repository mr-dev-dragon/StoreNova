import React from "react";
import StarInput from "./StarInput";
import CheckboxGroup from "./CheckboxGroup";
import ColorSelector from "./ColorSelector";
import SearchInput from "./SearchInput";

const FilterInputRenderer = ({
  type,
  keyName,
  label,
  values,
  selectedFilters,
  setSelectedFilters,
  titleSearch,
  setTitleSearch,
}) => {
  if (type === "color") {
    return (
      <ColorSelector
        values={values}
        keyName={keyName}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    );
  }

  if (type === "text" && keyName === "title") {
    return (
      <SearchInput
        value={titleSearch}
        onChange={(e) => setTitleSearch(e.target.value)}
        placeholder={`Search by ${label.toLowerCase()}...`}
      />
    );
  }

  if (type === "star") {
    const currentStarValue = selectedFilters[keyName]
      ? Number(selectedFilters[keyName])
      : 0;

    return (
      <StarInput
        maxStars={5}
        value={currentStarValue}
        onChange={(value) => {
          setSelectedFilters((prev) => {
            if (value === 0) {
              const newFilters = { ...prev };
              delete newFilters[keyName];
              return newFilters;
            }
            return { ...prev, [keyName]: value };
          });
        }}
      />
    );
  }

  if (type === "number" || type === "string") {
    return (
      <CheckboxGroup
        values={values}
        keyName={keyName}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    );
  }

  return null;
};

export default FilterInputRenderer;

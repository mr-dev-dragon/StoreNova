import React from "react";
import classNames from "classnames";

const ColorSelector = ({
  values,
  keyName,
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleColorClick = (color) => {
    setSelectedFilters((prev) => {
      const current = prev[keyName] || [];
      const updated = current.includes(color)
        ? current.filter((v) => v !== color)
        : [...current, color];
      return { ...prev, [keyName]: updated };
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((color) => {
        const isSelected = selectedFilters[keyName]?.includes(color);
        return (
          <div
            key={color}
            onClick={() => handleColorClick(color)}
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
};

export default ColorSelector;

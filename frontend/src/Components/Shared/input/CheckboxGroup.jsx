import React from "react";

const CheckboxGroup = ({
  values,
  keyName,
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleCheckboxChange = (value) => {
    setSelectedFilters((prev) => {
      const current = prev[keyName] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [keyName]: updated };
    });
  };

  return (
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
                onChange={() => handleCheckboxChange(val)}
              />
              {val}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default CheckboxGroup;

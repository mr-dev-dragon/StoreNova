import React from "react";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm"
    />
  );
};

export default SearchInput;

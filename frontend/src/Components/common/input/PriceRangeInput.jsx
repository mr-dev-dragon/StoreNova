import React from "react";

const PriceRangeInput = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  return (
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
};

export default PriceRangeInput;

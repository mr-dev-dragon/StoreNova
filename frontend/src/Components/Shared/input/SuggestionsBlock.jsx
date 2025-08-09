import React from "react";

const SuggestionsBlock = ({
  showSuggestions,
  suggestionsRef,
  suggestedItems,
}) => {
  if (!showSuggestions || !suggestedItems || suggestedItems.length === 0)
    return null;

  return (
    <div
      ref={suggestionsRef}
      className="bg-white border border-gray-300 rounded-md shadow-md p-3 mt-2 max-h-60 overflow-auto"
    >
      <ul className="space-y-1 text-sm text-gray-700">
        {suggestedItems.map((item, idx) => (
          <li
            key={idx}
            className="cursor-pointer hover:bg-purple-100 rounded px-2 py-1"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsBlock;

// SortBar.jsx
import { AiOutlineFilter } from "react-icons/ai";

const SortBar = ({
  filteredDataLength,
  sortConfig, // { key: string, order: "asc" | "desc" }
  setSortConfig,
  setShowFilters,
  config = [], // [{ key, label, type }]
}) => {
  // Toggle sorting on a column/key
  const handleSortChange = (key) => {
    if (sortConfig.key === key) {
      // toggle order
      setSortConfig({
        key,
        order: sortConfig.order === "asc" ? "desc" : "asc",
      });
    } else {
      // new key, default asc
      setSortConfig({ key, order: "asc" });
    }
  };

  // Render sort label with arrow
  const renderSortLabel = (item) => {
    if (sortConfig.key !== item.key) return item.label;

    const arrow = sortConfig.order === "asc" ? "↑" : "↓";
    return (
      <>
        {item.label}{" "}
        <span className="ml-1 text-purple-600 font-bold">{arrow}</span>
      </>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
      <p className="text-sm text-gray-700">
        Showing {filteredDataLength} result{filteredDataLength !== 1 ? "s" : ""}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {config.map(({ key, label, type }) => (
          <button
            key={key}
            className={`text-sm font-medium px-3 py-1 rounded ${
              sortConfig.key === key
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            } transition`}
            onClick={() => handleSortChange(key)}
            title={`Sort by ${label}`}
          >
            {renderSortLabel({ key, label, type })}
          </button>
        ))}

        <button
          className="md:hidden flex items-center gap-1 text-sm text-gray-700 border px-2 py-1 rounded hover:bg-gray-100 ml-auto"
          onClick={() => setShowFilters(true)}
          title="Show Filters"
        >
          <AiOutlineFilter className="w-4 h-4" /> Filters
        </button>
      </div>
    </div>
  );
};

export default SortBar;

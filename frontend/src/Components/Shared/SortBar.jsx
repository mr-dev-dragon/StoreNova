import { AiOutlineFilter } from "react-icons/ai";

const SortBar = ({
  filteredDataLength,
  sortOrder,
  setSortOrder,
  setShowFilters,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm flex items-center justify-between">
      <p className="text-sm text-gray-700">
        Showing {filteredDataLength} results
      </p>
      <div className="flex items-center gap-2">
        <button
          className="text-sm text-purple-600 font-medium hover:underline"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
        </button>
        <button
          className="md:hidden flex items-center gap-1 text-sm text-gray-700 border px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => setShowFilters(true)}
        >
          <AiOutlineFilter className="w-4 h-4" /> Filters
        </button>
      </div>
    </div>
  );
};

export default SortBar;

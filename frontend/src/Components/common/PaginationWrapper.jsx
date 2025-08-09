import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

const defaultVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.02 } }),
  exit: { opacity: 0, y: -10 },
};

const PaginationWrapper = ({
  data = [],
  itemsPerPageOptions = [20, 30, 50, 100],
  initialPerPage = 20,
  CardComponent,
  variants = defaultVariants,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage]
  );

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [currentPage, itemsPerPage, data]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const renderPages = () => {
    const pages = [];
    const pad = 1;

    const left = Math.max(2, currentPage - pad);
    const right = Math.min(totalPages - 1, currentPage + pad);

    pages.push(1);
    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Items Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {currentItems.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <CardComponent item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls Container */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Items per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Items per page:</span>
          <select
            className="text-sm font-medium px-3 py-1 rounded border border-gray-200 bg-white text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {itemsPerPageOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="text-sm font-medium px-3 py-1 rounded border border-gray-200 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition disabled:opacity-50"
          >
            ←
          </button>
          {renderPages().map((p, i) => (
            <button
              key={i}
              disabled={p === "..."}
              onClick={() => typeof p === "number" && handlePageChange(p)}
              className={`text-sm font-medium px-3 py-1 rounded border border-gray-200 transition ${
                p === currentPage
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="text-sm font-medium px-3 py-1 rounded border border-gray-200 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationWrapper;

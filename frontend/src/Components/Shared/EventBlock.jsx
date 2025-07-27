import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import Card from "./Card";

const EventBlock = ({ type, layout = "sidebar", data = [], variants }) => {
  const wrapperClasses = classNames(
    layout === "sidebar"
      ? "flex flex-col gap-4" // ✅ vertical stacking for sidebar
      : layout === "row"
        ? "flex flex-row gap-4 overflow-x-auto pb-2"
        : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
  );

  if (!type || data.length === 0) return null;

  const renderContent = () => {
    switch (type) {
      case "suggestion":
        return data.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="w-full" // ✅ full width
          >
            <Card item={{ ...item, lazy: true }} row />
          </motion.div>
        ));

      case "promo":
        return data.map((promo, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="w-full bg-purple-100 p-4 rounded-lg text-sm text-purple-800"
          >
            <strong>{promo.title}</strong>
            <p>{promo.description}</p>
          </motion.div>
        ));

      case "trending":
        return data.map((trend, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="w-full bg-yellow-100 p-4 rounded-lg text-sm text-yellow-800"
          >
            <p>🔥 {trend.name}</p>
          </motion.div>
        ));

      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden">
      <motion.div layout className={wrapperClasses}>
        <AnimatePresence mode="popLayout">{renderContent()}</AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EventBlock;

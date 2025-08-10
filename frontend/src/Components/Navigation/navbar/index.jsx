import { useState, useCallback, useEffect } from "react";
import NavSection from "./NavSection";
import SearchBar from "./SearchBar";

const Navbar = ({ getNavConfig, currentRoute, setCurrentRoute }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClickOutside = useCallback(
    (e) => {
      if (
        openIndex !== null &&
        !document
          .querySelector(`[data-li-index="${openIndex}"]`)
          ?.contains(e.target) &&
        !document
          .querySelector(`[data-dropdown-index="${openIndex}"]`)
          ?.contains(e.target)
      ) {
        setOpenIndex(null);
      }
    },
    [openIndex]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const searchBar = getNavConfig.find((i) => i.section === "search");

  const grouped = {
    logo: getNavConfig.filter((i) => i.section === "logo"),
    navigation: getNavConfig.filter((i) => i.section === "navigation"),
    actions: getNavConfig.filter((i) => i.section === "actions"),
    settings: getNavConfig.filter((i) => i.section === "settings"),
  };

  return (
    <nav className="hidden md:flex items-center justify-between px-8 h-16 bg-white w-full border border-gray-200 rounded-lg shadow-sm">
      <NavSection
        items={grouped.logo}
        openIndex={openIndex}
        setOpenIndex={setOpenIndex}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      <SearchBar config={searchBar} />

      <NavSection
        items={grouped.navigation}
        openIndex={openIndex}
        setOpenIndex={setOpenIndex}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <NavSection
        items={grouped.actions}
        openIndex={openIndex}
        setOpenIndex={setOpenIndex}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <NavSection
        items={grouped.settings}
        openIndex={openIndex}
        setOpenIndex={setOpenIndex}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
    </nav>
  );
};

export default Navbar;

import { useFavorites } from "../../../servers/context/FavoritesContext";
import Card from "../../Shared/Card";
import classNames from "classnames";
import { useEffect, useRef, useState, useCallback } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import DropdownCardList from "../navbar/DropdownCardList";

const Navbar = ({ getNavConfig, currentRoute, setCurrentRoute }) => {
  const { state, dispatch } = useFavorites();
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

  const renderItem = (item, index) => {
    const isActive = currentRoute === item.title;
    const isOpen = openIndex === index;
    const dropdownItems = Array.isArray(item.dropdown) ? item.dropdown : [];

    const onItemClicked = (e) => {
      e.stopPropagation();
      if (item.section === "actions" && dropdownItems.length > 0) {
        setOpenIndex(isOpen ? null : index);
      } else {
        setOpenIndex(null);
      }
      setCurrentRoute(item.title);
    };

    return (
      <li
        key={item.id || index}
        data-li-index={index}
        onClick={onItemClicked}
        className={classNames(
          "relative font-medium tracking-wide text-sm flex items-center justify-center gap-1 px-3 py-1 rounded transition cursor-pointer select-none",
          isActive && item.section === "navigation"
            ? "text-purple-united-1 border border-purple-400 bg-purple-100"
            : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 border border-transparent",
          item.section === "actions" ? "w-14" : "w-25",
          isActive && item.section === "logo" && "text-black"
        )}
      >
        {item.showIcon && item.icon && item.section !== "settings" && (
          <div className="relative flex items-center justify-center">
            <item.icon
              className={classNames(
                "text-xl",
                isActive &&
                  item.section === "actions" &&
                  "text-purple-united-1 drop-shadow-sm"
              )}
            />
            {item.itemCount > 0 && (
              <span
                className={classNames(
                  "absolute -top-2 -right-2 text-xs px-1 py-0.5 rounded-full bg-white border",
                  isActive
                    ? "text-purple-united-1 border-purple-united-1"
                    : "text-black"
                )}
              >
                {item.itemCount}
              </span>
            )}
          </div>
        )}

        {item.showIcon && item.icon && item.section === "settings" && (
          <MdOutlineAddCircleOutline
            className={classNames(
              "text-xl text-gray-400",
              isActive && "text-purple-united-1 drop-shadow-sm"
            )}
          />
        )}

        {item.avatar && (
          <img
            src={item.avatar}
            alt={item.title}
            className={classNames(
              "h-8 w-8 rounded-full object-cover",
              isActive &&
                item.section === "settings" &&
                "border-2 border-purple-united-1 w-7 h-7"
            )}
          />
        )}

        {item.showTitle && <span className="leading-none">{item.title}</span>}

        {isOpen && item.section === "actions" && dropdownItems.length > 0 && (
          <div
            data-dropdown-index={index}
            className="absolute top-full mt-2 z-50 w-80 max-h-[384px] overflow-y-auto rounded-lg bg-white p-2 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownCardList
              items={item.dropdown}
              type={item.title.toLowerCase()}
              dispatch={dispatch}
            />
          </div>
        )}
      </li>
    );
  };

  const searchBar = getNavConfig.find((i) => i.section === "search");

  const grouped = {
    logo: getNavConfig.filter((i) => i.section === "logo"),
    navigation: getNavConfig.filter((i) => i.section === "navigation"),
    actions: getNavConfig.filter((i) => i.section === "actions"),
    settings: getNavConfig.filter((i) => i.section === "settings"),
  };

  return (
    <nav className="hidden md:flex items-center justify-between px-8 h-16 bg-white w-full border border-gray-200 rounded-lg shadow-sm">
      <ul className="flex items-center h-12">{grouped.logo.map(renderItem)}</ul>

      <ul className="flex items-center h-8">
        {searchBar?.input && (
          <li className="relative">
            <input
              type="text"
              className="rounded px-4 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-300 p-2"
              placeholder={searchBar.placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = searchBar.action || "/search";
                }
              }}
            />
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 mr-2 text-gray-400"
            >
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </svg>
          </li>
        )}
      </ul>

      <ul className="flex items-center h-8">
        {grouped.navigation.map(renderItem)}
      </ul>
      <ul className="flex items-center h-8">
        {grouped.actions.map(renderItem)}
      </ul>
      <ul className="flex items-center h-8">
        {grouped.settings.map(renderItem)}
      </ul>
    </nav>
  );
};

export default Navbar;

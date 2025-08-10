import classNames from "classnames";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import DropdownCardList from "./NavDropdown";
import { useFavorites } from "../../../context/FavoritesContext";

const NavItem = ({
  item,
  index,
  isOpen,
  isActive,
  setOpenIndex,
  setCurrentRoute,
}) => {
  const { dispatch } = useFavorites();
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
      {/* Icons */}
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

      {/* Avatar */}
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

      {/* Title */}
      {item.showTitle && <span className="leading-none">{item.title}</span>}

      {/* Dropdown */}
      {isOpen && item.section === "actions" && dropdownItems.length > 0 && (
        <div
          data-dropdown-index={index}
          className="absolute top-full z-50 w-80 max-h-[384px] overflow-y-auto rounded-lg bg-white p-2 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownCardList
            items={dropdownItems}
            type={item.title.toLowerCase()}
            dispatch={dispatch}
          />
        </div>
      )}
    </li>
  );
};

export default NavItem;

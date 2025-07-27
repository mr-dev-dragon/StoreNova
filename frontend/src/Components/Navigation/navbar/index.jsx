// import React from "react";
// import classNames from "classnames";
// import styles from "./Navbar.module.css";
// import { MdOutlineAddCircleOutline } from "react-icons/md";
// const Navbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
//   const renderItem = (item, index) => (
//     <li
//       key={index}
//       className={classNames([
//         "text-black-500  cursor-pointer font-medium tracking-wide text-md flex items-center justify-center gap-1 px-2",
//         currentRoute === item.title && item.section === "navigation"
//           ? "text-purple-600   border-purple-400  from-white "
//           : "",
//         item.section === "actions" ? "w-14 " : "w-25",
//         currentRoute === item.title &&
//           item.section === "logo" &&
//           " text-black-500",
//       ])}
//       onClick={() => setCurrentRoute(item.title)}
//     >
//       {item.showIcon && item.icon && item.section != "settings" && (
//         <item.icon
//           className={classNames([
//             "text-xl",
//             currentRoute === item.title &&
//               item.section === "actions" &&
//               "text-purple-600 drop-shadow-sm ",
//           ])}
//         />
//       )}

//       {item.showIcon && item.icon && item.section === "settings" && (
//         <MdOutlineAddCircleOutline
//           className={classNames([
//             "text-xl text-gray-400",
//             currentRoute === item.title && "text-purple-600 drop-shadow-sm ",
//           ])}
//         />
//       )}

//       {item.avatar && (
//         <img
//           src={item.avatar}
//           alt={item.title}
//           className={classNames([
//             "h-8 w-8 rounded-full object-cover",
//             currentRoute === item.title &&
//               item.section === "settings" &&
//               " border-2 border-purple-600 w-7 h-7",
//           ])}
//         />
//       )}
//       {/* {item.title === "settings" && <item.icon className={classNames([""])} />} */}
//       {item.showTitle && <span className="leading-none">{item.title}</span>}
//       {item.itemCount > 0 && (
//         <span
//           className={classNames([
//             "ml-0.5  text-black  px-0.5 py-0 rounded-full",
//             styles.textxxs,
//             currentRoute === item.title && "  text-purple-700",
//           ])}
//         >
//           {item.itemCount}
//         </span>
//       )}
//     </li>
//   );

//   const searchBar = navigationData.find((item) => item.section === "search");

//   const sections = {
//     logo: navigationData.filter((item) => item.section === "logo"),
//     navigation: navigationData.filter((item) => item.section === "navigation"),
//     actions: navigationData.filter((item) => item.section === "actions"),
//     settings: navigationData.filter((item) => item.section === "settings"),
//   };

//   return (
//     <nav className="hidden md:flex flex-row items-center justify-between px-8 h-18 bg-white w-full">
//       {/* LOGO */}
//       <ul className="flex flex-row  h-12">{sections.logo.map(renderItem)}</ul>

//       {/* SEARCH */}
//       <ul className="flex flex-row  h-8">
//         {searchBar && searchBar.input && (
//           <li className={styles.containerInput}>
//             <div className={styles["search-container"]}>
//               <input
//                 type="text"
//                 className={styles.input}
//                 placeholder={searchBar.placeholder}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     window.location.href = searchBar.action || "/search";
//                   }
//                 }}
//               />
//               <svg viewBox="0 0 24 24" className={styles.search__icon}>
//                 <g>
//                   <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
//                 </g>
//               </svg>
//             </div>
//           </li>
//         )}
//       </ul>

//       {/* NAVIGATION */}
//       <ul className="flex flex-row  h-8">
//         {sections.navigation.map(renderItem)}
//       </ul>

//       {/* ACTIONS */}
//       <ul className="flex flex-row  h-8">{sections.actions.map(renderItem)}</ul>

//       {/* SETTINGS */}
//       <ul className="flex flex-row  h-8">
//         {sections.settings.map(renderItem)}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import classNames from "classnames";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const Navbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
  const renderItem = (item, index) => (
    <li
      key={index}
      className={classNames(
        "cursor-pointer font-medium tracking-wide text-sm flex items-center justify-center gap-1 px-3 py-1 rounded transition",
        currentRoute === item.title && item.section === "navigation"
          ? "text-purple-700 border border-purple-400 bg-purple-100"
          : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 border border-transparent",
        item.section === "actions" ? "w-14" : "w-25",
        currentRoute === item.title && item.section === "logo" && "text-black"
      )}
      onClick={() => setCurrentRoute(item.title)}
    >
      {item.showIcon && item.icon && item.section !== "settings" && (
        <item.icon
          className={classNames(
            "text-xl",
            currentRoute === item.title &&
              item.section === "actions" &&
              "text-purple-600 drop-shadow-sm"
          )}
        />
      )}

      {item.showIcon && item.icon && item.section === "settings" && (
        <MdOutlineAddCircleOutline
          className={classNames(
            "text-xl text-gray-400",
            currentRoute === item.title && "text-purple-600 drop-shadow-sm"
          )}
        />
      )}

      {item.avatar && (
        <img
          src={item.avatar}
          alt={item.title}
          className={classNames(
            "h-8 w-8 rounded-full object-cover",
            currentRoute === item.title &&
              item.section === "settings" &&
              "border-2 border-purple-600 w-7 h-7"
          )}
        />
      )}

      {item.showTitle && <span className="leading-none">{item.title}</span>}

      {item.itemCount > 0 && (
        <span
          className={classNames(
            "ml-0.5 text-xs px-1 py-0 rounded-full",
            currentRoute === item.title ? "text-purple-700" : "text-black"
          )}
        >
          {item.itemCount}
        </span>
      )}
    </li>
  );

  const searchBar = navigationData.find((item) => item.section === "search");

  const sections = {
    logo: navigationData.filter((item) => item.section === "logo"),
    navigation: navigationData.filter((item) => item.section === "navigation"),
    actions: navigationData.filter((item) => item.section === "actions"),
    settings: navigationData.filter((item) => item.section === "settings"),
  };

  return (
    <nav className="hidden md:flex items-center justify-between px-8 h-16 bg-white w-full border border-gray-200 rounded-lg shadow-sm">
      {/* LOGO */}
      <ul className="flex items-center h-12">
        {sections.logo.map(renderItem)}
      </ul>

      {/* SEARCH */}
      <ul className="flex items-center h-8">
        {searchBar && searchBar.input && (
          <li className="relative">
            <input
              type="text"
              className="rounded   px-4 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-300 p-2"
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

      {/* NAVIGATION */}
      <ul className="flex items-center h-8">
        {sections.navigation.map(renderItem)}
      </ul>

      {/* ACTIONS */}
      <ul className="flex items-center h-8">
        {sections.actions.map(renderItem)}
      </ul>

      {/* SETTINGS */}
      <ul className="flex items-center h-8">
        {sections.settings.map(renderItem)}
      </ul>
    </nav>
  );
};

export default Navbar;

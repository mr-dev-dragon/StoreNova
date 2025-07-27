import React from "react";
import classNames from "classnames";

const FooterBar = ({ links = [], onLinkClick }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Left Section */}
      <p className="text-sm text-gray-700">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </p>

      {/* Right Section */}
      <div className="flex flex-wrap items-center gap-2">
        {links.map((link, index) => (
          <button
            key={index}
            className={classNames([
              "text-sm font-medium px-3 py-1 rounded transition",
              link.active
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700 hover:text-purple-600 hover:bg-purple-50",
            ])}
            onClick={() => onLinkClick && onLinkClick(link)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FooterBar;

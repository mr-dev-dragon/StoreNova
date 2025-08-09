import React from "react";

const FilterSection = ({ label, children, className = "" }) => (
  <fieldset className={`pb-4 ${className}`}>
    <legend className="mb-2 text-base font-semibold capitalize">{label}</legend>
    {children}
  </fieldset>
);

export default FilterSection;

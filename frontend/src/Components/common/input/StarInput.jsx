"use client";
import { useState } from "react";

export default function StarInput({ maxStars = 5, value = 0, onChange }) {
  const [hoverValue, setHoverValue] = useState(0);

  const roundToHalf = (num) => Math.round(num * 2) / 2;

  const handleClick = (event, starIndex) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const clickPos = event.clientX - left;
    const isHalf = clickPos < width / 2;

    const newValue = isHalf ? starIndex - 0.5 : starIndex;

    onChange && onChange(newValue);
  };

  const handleReset = () => {
    onChange && onChange(0);
  };

  const getStarType = (starIndex) => {
    const val = roundToHalf(hoverValue || value);

    if (val >= starIndex) return "full";
    if (val + 0.5 === starIndex) return "half";
    return "empty";
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      let newVal = Math.min(roundToHalf((hoverValue || value) + 0.5), maxStars);
      onChange && onChange(newVal);
      setHoverValue(newVal);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      let newVal = Math.max(roundToHalf((hoverValue || value) - 0.5), 0);
      onChange && onChange(newVal);
      setHoverValue(newVal);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      handleReset();
      setHoverValue(0);
    }
  };

  return (
    <div
      className="inline-flex items-center space-x-2"
      role="group"
      aria-label="Star rating filter"
    >
      <div
        className="flex cursor-pointer select-none"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onMouseLeave={() => setHoverValue(0)}
        aria-valuemin={0}
        aria-valuemax={maxStars}
        aria-valuenow={value}
        aria-valuetext={`${value} star${value !== 1 ? "s" : ""}`}
        role="slider"
      >
        {Array.from({ length: maxStars }, (_, i) => {
          const starIndex = i + 1;
          const starType = getStarType(starIndex);

          return (
            <StarSVG
              key={i}
              starType={starType}
              onMouseMove={(e) => {
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const hoverPos = e.clientX - left;
                const isHalf = hoverPos < width / 2;
                setHoverValue(isHalf ? starIndex - 0.5 : starIndex);
              }}
              onClick={(e) => handleClick(e, starIndex)}
            />
          );
        })}
      </div>

      {value > 0 && (
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-red-600 hover:underline focus:outline-none"
          aria-label="Reset star filter"
        >
          Reset
        </button>
      )}
    </div>
  );
}

const StarSVG = ({ starType, onClick, onMouseMove }) => {
  const baseClass = "w-6 h-6 text-yellow-400";

  const refinedStarPath =
    "M10 1.5l2.95 6.02 6.64.97-4.8 4.68 1.13 6.59L10 16.77l-5.92 3.1 " +
    "1.13-6.59-4.8-4.68 6.64-.97L10 1.5z";

  if (starType === "full") {
    return (
      <svg
        onClick={onClick}
        onMouseMove={onMouseMove}
        className={baseClass}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d={refinedStarPath} />
      </svg>
    );
  }

  if (starType === "half") {
    return (
      <svg
        onClick={onClick}
        onMouseMove={onMouseMove}
        className={baseClass}
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="halfGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path fill="url(#halfGradient)" d={refinedStarPath} />
      </svg>
    );
  }

  return (
    <svg
      onClick={onClick}
      onMouseMove={onMouseMove}
      className={`${baseClass} text-gray-300`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d={refinedStarPath} />
    </svg>
  );
};

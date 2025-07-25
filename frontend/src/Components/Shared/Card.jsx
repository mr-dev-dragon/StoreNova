import { AiFillStar } from "react-icons/ai";
import classNames from "classnames";
function Card({ item, classNameToPass, row = false }) {
  return (
    <>
      {row ? (
        <div className="flex items-center gap-3 p-2 rounded-md border border-gray-200 bg-white shadow-sm hover:shadow transition-all mb-2">
          <div className="w-11 h-11 rounded overflow-hidden flex-shrink-0">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-800 truncate">
              {item.title}
            </div>
            <div className="text-[11px] text-gray-400 truncate">
              {item.company}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[12px] font-bold text-gray-900">
                ${item.newPrice}
              </span>
              <span className="text-[10px] line-through text-gray-400">
                {item.prevPrice}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={classNames([
            "bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all p-2 w-full",
            `${classNameToPass || ""}`,
          ])}
        >
          <div className="w-full h-40 rounded-md overflow-hidden mb-2">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-contain object-center"
            />
          </div>
          <h2 className="text-sm font-medium text-gray-800 truncate">
            {item.title}
          </h2>
          <p className="text-xs text-gray-400">{item.company}</p>
          <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
            <AiFillStar className="text-yellow-500" />
            <span className="text-gray-600">{item.reviews}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm font-semibold text-gray-900">
              ${item.newPrice}
            </span>
            <span className="text-xs line-through text-gray-400">
              {item.prevPrice}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;

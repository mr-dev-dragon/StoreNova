import { useFavorites } from "../../servers/context/FavoritesContext";
import { AiFillStar } from "react-icons/ai";
import classNames from "classnames";

function Card({ item, classNameToPass, row = false, listType = "default" }) {
  const { state, dispatch } = useFavorites();

  const isFavorite = state.favorites.some((i) => i.id === item.id);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: item });
    } else {
      dispatch({ type: "ADD_TO_FAVORITES", payload: item });
    }
  };

  const handleBuy = () => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  return (
    <>
      {row ? (
        <div className="flex items-center justify-between p-2 rounded border border-gray-200 bg-white shadow-sm hover:shadow transition-all gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 flex-shrink-0 rounded overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-gray-800 truncate max-w-[120px]">
                {item.title}
              </div>
              <div className="text-[10px] text-gray-400 truncate max-w-[120px]">
                ${item.newPrice}
                {item.prevPrice && (
                  <span className="ml-1 line-through text-gray-300">
                    {item.prevPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {listType === "favorites" && (
              <>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: item })
                  }
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: item })
                  }
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Move to Cart
                </button>
              </>
            )}
            {listType === "cart" && (
              <>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: item })
                  }
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_FAVORITES", payload: item })
                  }
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Move to Favorites
                </button>
              </>
            )}
            {listType !== "favorites" && listType !== "cart" && (
              <>
                <button
                  onClick={handleFavorite}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  {isFavorite ? "Remove Favorite" : "Save Favorite"}
                </button>
                <button
                  onClick={handleBuy}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Buy
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className={classNames(
            "bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all p-2 w-full",
            classNameToPass || ""
          )}
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
          <div className="flex items-center gap-1 mt-1">
            <button onClick={handleFavorite}>
              {isFavorite ? "💔 Remove" : "❤️ Save"}
            </button>
            <button onClick={handleBuy}>🛒 Buy</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;

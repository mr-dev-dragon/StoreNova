const SearchBar = ({ config }) => {
  if (!config?.input) return null;

  return (
    <ul className="flex items-center h-8">
      <li className="relative">
        <input
          type="text"
          className="rounded px-4 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-300 p-2"
          placeholder={config.placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.location.href = config.action || "/search";
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
    </ul>
  );
};

export default SearchBar;

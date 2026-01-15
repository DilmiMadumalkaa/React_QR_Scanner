import { Search } from "lucide-react";

export default function AssestSearchBar() {
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        {/* Search Icon */}
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 items-center"
          size={18}
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search Assests"
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm 
                     focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100
                     transition"
        />
      </div>
    </div>
  );
}
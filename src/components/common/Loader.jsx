import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-20">
      <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 border-t-4 border-b-4 border-blue-950 mb-4"></div>
      <p className="text-gray-600 text-base sm:text-lg">
        {message}
      </p>
    </div>
  );
};

export default Loader;

export default function Pagination({
  totalPage = 1,
  currentPage = 1,
  onPageChange = () => {},
  totalItems = 0,
  pageSize = 10,
  className = "",
}) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={`bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow-sm ${className}`}
    >
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">{start}</span> đến{" "}
          <span className="font-medium">{end}</span> của{" "}
          <span className="font-medium">{totalItems}</span> kết quả
        </p>

        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {/* Prev */}
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 
                3.293a1 1 0 01-1.414 1.414l-4-4a1 1 
                0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Pages */}
          {Array.from({ length: totalPage }).map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPage}
            onClick={() => onPageChange(currentPage + 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 
                10 7.293 6.707a1 1 
                0 011.414-1.414l4 4a1 1 0 
                010 1.414l-4 4a1 1 0 01-1.414 
                0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}

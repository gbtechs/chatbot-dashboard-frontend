import React from "react";

interface PaginationProps {
  page: number;
  count: number;
  size: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  count,
  size,
  onPageChange,
}) => {
  const totalPages = Math.ceil(count / size);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-center space-x-2 my-4">
      {generatePageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          className={`w-[40px] h-[40px] border-1 rounded-full ${
            page === pageNumber ? "bg-orange text-white" : "text-dark"
          }`}
          onClick={() =>
            typeof pageNumber === "number" && onPageChange(pageNumber)
          }
          disabled={typeof pageNumber !== "number"}
        >
          <h3>{pageNumber}</h3>
        </button>
      ))}
    </div>
  );
};

export default Pagination;

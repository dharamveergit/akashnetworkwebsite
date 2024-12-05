import { Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // Optional props for additional customization
  siblingCount?: number;
  className?: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = "",
}: BlogPaginationProps) {
  // Generate page range function
  const generatePageRange = () => {
    // If total pages is less than the range we want to show, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    // Add ellipsis if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageRange = generatePageRange();

  return (
    <nav
      aria-label="Pagination"
      className={`mt-10 flex items-center justify-center space-x-2 ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="group relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronLeftIcon
          className="h-5 w-5 transition-transform group-hover:-translate-x-1 group-disabled:translate-x-0"
          aria-hidden="true"
        />
        <span className="sr-only">Previous</span>
      </button>

      {/* Page Numbers */}
      {pageRange.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <Transition
            key={page}
            show={true}
            enter="transition-all duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
          >
            <button
              onClick={() => onPageChange(page as number)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 
                ${
                  currentPage === page
                    ? "z-10 bg-blue-500 text-white shadow-md"
                    : "border border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
                }
                rounded-md focus:z-20`}
            >
              {page}
            </button>
          </Transition>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="group relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon
          className="h-5 w-5 transition-transform group-hover:translate-x-1 group-disabled:translate-x-0"
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}

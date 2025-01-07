import { Icon } from "@iconify/react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    if (totalPages === 0) return [];
    if (totalPages === 1) return [1];

    const maxVisiblePages = 6;
    const startPage = Math.max(
      currentPage - Math.floor(maxVisiblePages / 2),
      2
    ); // Start from page 2 (reserve space for first page)
    const endPage = Math.min(startPage + maxVisiblePages - 3, totalPages - 1); // Reserve space for last page.

    const adjustedStartPage = Math.max(endPage - (maxVisiblePages - 3) + 1, 2); // Ensure minimum range.

    const pageNumbers = Array.from(
      { length: endPage - adjustedStartPage + 1 },
      (_, i) => adjustedStartPage + i
    );

    // Always include the first page if not in range
    if (adjustedStartPage > 2) {
      pageNumbers.unshift(-1);
      pageNumbers.unshift(1);
    } else {
      pageNumbers.unshift(1);
    }

    // Always include the last page if not in range
    if (endPage < totalPages - 1) {
      pageNumbers.push(-1);
      pageNumbers.push(totalPages);
    } else {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return totalPages === 0 ? null : (
    <div className="archivement_pagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <Link
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            >
              <Icon
                icon="material-symbols:keyboard-double-arrow-left"
                width="16px"
                height="16px"
              />
            </Link>
          </li>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) =>
            page !== -1 ? (
              <li
                className={`page-item ${currentPage === page ? "active" : ""}`}
                key={index}
              >
                <Link
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </Link>
              </li>
            ) : (
              <li className="page-item disabled" key={index}>
                <span className="page-link">{"..."}</span>
              </li>
            )
          )}

          {/* Next Button */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <Link
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            >
              <Icon
                icon="material-symbols:keyboard-double-arrow-right"
                width="16px"
                height="16px"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

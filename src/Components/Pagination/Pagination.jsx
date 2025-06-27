import React from 'react';
import "./style.css";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Логика для отображения или скрытия пагинации
  if (totalItems <= itemsPerPage) {
    return null;
  }

  // Определяем диапазон страниц для отображения
  const maxPagesToShow = 4;
  let startPage = Math.max(1, Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleNextBlock = () => {
    if (endPage < totalPages) {
      paginate(startPage + maxPagesToShow);
    }
  };

  const handlePrevBlock = () => {
    if (startPage > 1) {
      paginate(startPage - 1);
    }
  };

  return (
    <nav className='number' aria-label="Page navigation">
      <ul className="pagination">
        {startPage > 1 && (
          <li className="page-item">
            <button
              onClick={handlePrevBlock}
              className="page-link"
              aria-label="Previous Block"
            >
              <MdChevronLeft/>
            </button>
          </li>
        )}
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${number === currentPage ? 'active' : ''}`}
              aria-current={number === currentPage ? 'page' : undefined}
            >
              {number}
            </button>
          </li>
        ))}
        {endPage < totalPages && (
          <li className="page-item">
            <button
              onClick={handleNextBlock}
              className="page-link"
              aria-label="Next Block"
            >
              <MdChevronRight />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;

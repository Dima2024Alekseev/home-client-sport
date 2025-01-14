import React from 'react';
import "./style.css";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Логика для отображения или скрытия пагинации
  if (totalItems <= itemsPerPage) {
    return null;
  }

  return (
    <nav className='number' aria-label="Page navigation">
      <ul className="pagination">
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
      </ul>
    </nav>
  );
};

export default Pagination;

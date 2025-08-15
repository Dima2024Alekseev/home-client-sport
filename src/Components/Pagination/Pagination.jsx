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

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    return (
        <nav className='number' aria-label="Page navigation">
            <ul className="pagination">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button
                            onClick={handlePrevPage}
                            className="page-link"
                            aria-label="Previous Page"
                        >
                            <MdChevronLeft />
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
                {currentPage < totalPages && (
                    <li className="page-item">
                        <button
                            onClick={handleNextPage}
                            className="page-link"
                            aria-label="Next Page"
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
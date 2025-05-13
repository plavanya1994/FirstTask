import React, { useState } from "react";

const Pagination = ({ currentPage, numOfPages, setCurrentPage }) => {
  const handlePagination = (num) => {
    setCurrentPage(num);
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  return (
    <div className="d-flex">
      <span className="pagination" onClick={handlePrev}>
        Prev
      </span> 
      {[...Array(numOfPages).keys()].map((n) => (
        <span
          className={`pagination ${currentPage === n ? "active" : ""}`}
          key={n}
          onClick={() => handlePagination(n)}
        >
          {n}
        </span>
      ))}
      <span className="pagination" onClick={handleNext}>
        Next
      </span>
    </div>
  );
};
export default Pagination;
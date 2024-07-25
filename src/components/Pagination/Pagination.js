import React from "react";

import "./Pagination.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-main-container">
      <ul className="pagination">
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              className={page === currentPage ? "active-button" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;

import React, { useEffect } from "react";

import "../../styles/pagination/pagination.css";

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage }) => {
  let pages = [];

  useEffect(() => {
    const c = document.querySelector(".paginationContainer");
    const indexs = Array.from(document.querySelectorAll(".index"));
    let cur = -1;

    indexs.forEach((index, i) => {
      index.addEventListener("click", (e) => {
        // clear
        c.className = "paginationContainer";
        void c.offsetWidth; // Reflow
        c.classList.add("open");
        c.classList.add(`i${i + 1}`);
        if (cur > i) {
          c.classList.add("flip");
        }
        cur = i;
      });
    });

    // Cleanup to remove event listeners when the component is unmounted or re-rendered
    return () => {
      indexs.forEach((index) => {
        index.replaceWith(index.cloneNode(true));
      });
    };
  }, [totalPosts]);

  for (
    let counter = 1;
    counter <= Math.ceil(totalPosts / postsPerPage);
    counter++
  ) {
    pages.push(counter);
  }
  return (
    <div className="paginationContainer">
      <span>
        {pages.map((page, index) => (
          <div
            key={index}
            onClick={() => setCurrentPage(page)}
            className="index"
          >
            {page}
          </div>
        ))}
      </span>
      <svg viewBox="0 0 100 100">
        <path d="m 7.1428558,49.999998 c -1e-7,-23.669348 19.1877962,-42.8571447 42.8571442,-42.8571446 23.669347,0 42.857144,19.1877966 42.857144,42.8571446" />
      </svg>
      <svg viewBox="0 0 100 100">
        <path d="m 7.1428558,49.999998 c -1e-7,23.669347 19.1877962,42.857144 42.8571442,42.857144 23.669347,0 42.857144,-19.187797 42.857144,-42.857144" />
      </svg>
    </div>
  );
};

export default Pagination;

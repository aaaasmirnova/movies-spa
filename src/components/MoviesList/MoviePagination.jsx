export const MoviePagination = ({ total, currentPage, setCurrentPage }) => {
  const changeActivePage = (page) => {
    setCurrentPage(page);
  };

  const getPagesNumber = () => {
    const visiblePages = [];
    const maxVisiblePages = 3;

    if (total <= maxVisiblePages) {
      for (let i = 1; i <= total; i++) {
        visiblePages.push(i);
      }
    } else if (currentPage <= 2) {
      for (let i = 1; i <= maxVisiblePages; i++) {
        visiblePages.push(i);
      }
    } else if (currentPage >= total - 1) {
      for (let i = total - 2; i <= total; i++) {
        visiblePages.push(i);
      }
    } else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  const pages = getPagesNumber();

  return (
    <div className="movies-pagination">
      {pages.map((elem, index) => (
        <button
          onClick={() => changeActivePage(elem)}
          className={`movies-pagination-item ${
            currentPage === elem ? "movies-active-pagination-item" : ""
          }`}
          key={index}
        >
          {elem}
        </button>
      ))}
    </div>
  );
};

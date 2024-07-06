import React from 'react';

const LoadMore = ({ currentPage, totalPages, onLoadMore }) => {
  return (
    <div className="load-more">
      <button
        disabled={currentPage >= totalPages}
        onClick={onLoadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMore;

import React from 'react';

const ScrollToTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className="scroll-to-top scroll-to-top--hidden" onClick={handleClick}>
      ↑
    </button>
  );
};

export default ScrollToTop;

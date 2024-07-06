import React, { createContext, useState, useContext } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState('home');
  const [modalData, setModalData] = useState(null);

  return (
    <PageContext.Provider value={{ page, setPage, modalData, setModalData }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);

import React, { createContext, useCallback, useState, useContext } from "react";

type Pagination = {
  handlePagination(paginationProps: PaginationState): void;
  pagination: PaginationState;
};

type PaginationState = {
  limit: number;
  name?: string;
  offset: number;
};

const PaginationContext = createContext<Pagination>({} as Pagination);

export const PaginationProvider: React.FC = ({ children }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    limit: 12,
    offset: 0,
  });

  const handlePagination = useCallback((paginationProps) => {
    setPagination(paginationProps);
  }, []);

  return (
    <PaginationContext.Provider
      value={{
        handlePagination,
        pagination,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => useContext(PaginationContext);

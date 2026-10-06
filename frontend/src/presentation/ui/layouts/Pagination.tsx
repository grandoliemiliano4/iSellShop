import React from 'react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
  // If there's only 1 page (or 0), we don't need to show pagination
  if (lastPage <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-12 gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
      >
        Anterior
      </button>

      <span className="text-gray-300 font-medium">
        Página {currentPage} de {lastPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
}

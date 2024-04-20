'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Transaction } from '@/lib/types';

interface PaginationControlProps {
  transaction: Transaction[];
  transactionsPerPage: number;
  currentPage: number;
  paginate: (page: number) => void;
  maxDisplayedPages: number;
  totalPages: number;
  startPage: number;
}
function PaginationControls({ transaction, transactionsPerPage, currentPage, paginate, maxDisplayedPages, totalPages, startPage }: PaginationControlProps) {
  return (
    <div>
      {transaction.length > transactionsPerPage && (
        <div className="flex justify-center space-x-2 overflow-auto">
          {currentPage > 1 && (
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
          )}
          {Array.from({ length: maxDisplayedPages }, (_, i) => startPage + i).map((page) => (
            <Button
              key={page}
              onClick={() => paginate(page)}
              className={currentPage === page ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}
            >
              {page}
            </Button>
          ))}
          <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default PaginationControls;

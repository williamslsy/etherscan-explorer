'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { formatDate, formatEthPrice, formatEthPriceInUsd, formatFromNow } from '@/lib/utils';
import Link from 'next/link';
import { fetchAccountTransactions } from '@/lib/server-utils';
import { Transaction } from '@/lib/types';
import PaginationControls from './pagination-controls';

interface TxnTableProps {
  address: string;
  transactionData: Transaction[];
}

export default function TxnTable({ address, transactionData }: TxnTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const transactionsPerPage = 10;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactionData.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const displayedPages = 10;
  const totalPages = Math.ceil(transactionData.length / transactionsPerPage);
  const maxDisplayedPages = Math.min(displayedPages, totalPages);
  const startPage = totalPages > maxDisplayedPages ? Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2)) : 1;

  return (
    <div className="space-y-8">
      <h3 className="px-4 py-2 bg-primary text-white w-max rounded-lg">Transactions</h3>
      <Table className="border">
        <TableCaption>List of all the transactions</TableCaption>
        <TableHeader className="text-sm">
          <TableRow>
            <TableHead>Transaction Hash</TableHead>
            <TableHead>Block</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionData.length === 0 ? (
            <div className="flex items-center justify-center py-8 w-full">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            currentTransactions.map((transaction) => (
              <TableRow key={transaction.hash}>
                <TooltipProvider>
                  <TableCell>
                    <Link href={`/address/${address}/tx/${transaction.hash}`} className="text-primary">
                      {transaction.hash ? `${transaction.hash.substring(0, 16)}...` : 'Loading...'}
                    </Link>
                  </TableCell>
                  <TableCell>{transaction.blockNumber}</TableCell>
                  <TableCell>{formatFromNow(transaction.timeStamp * 1000)}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={`/address/${transaction.from}`} className="text-red-400">
                          {transaction.from ? `${transaction.from.substring(0, 16)}...` : 'Loading...'}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{transaction.from}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={`/address/${transaction.to}`} className="text-red-400">
                          {transaction.to ? `${transaction.to.substring(0, 16)}...` : 'Loading...'}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{transaction.to}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{formatEthPrice(transaction.value)} ETH</TableCell>
                </TooltipProvider>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <PaginationControls
        transaction={transactionData}
        transactionsPerPage={transactionsPerPage}
        currentPage={currentPage}
        paginate={paginate}
        maxDisplayedPages={maxDisplayedPages}
        totalPages={totalPages}
        startPage={startPage}
      />
    </div>
  );
}

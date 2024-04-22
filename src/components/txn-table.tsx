'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { formatEthPrice, formatFromNow } from '@/lib/utils';
import Link from 'next/link';
import { Transaction } from '@/lib/types';
import PaginationControls from './pagination-controls';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface TxnTableProps {
  address: string;
  transactionData: Transaction[];
}

export default function TxnTable({ address, transactionData }: TxnTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const transactionsPerPage = 25;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const displayedPages = 10;
  const totalPages = Math.ceil(transactionData.length / transactionsPerPage);
  const maxDisplayedPages = Math.min(displayedPages, totalPages);
  const startPage = totalPages > maxDisplayedPages ? Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2)) : 1;

  const [sortCriteria, setSortCriteria] = useState<'timeStamp' | 'value'>('timeStamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortTransactions = (transactions: Transaction[], criteria: 'timeStamp' | 'value', direction: 'asc' | 'desc') => {
    return [...transactions].sort((a, b) => {
      let valueA: number | bigint;
      let valueB: number | bigint;

      if (criteria === 'value') {
        valueA = BigInt(a.value);
        valueB = BigInt(b.value);
      } else {
        valueA = a.timeStamp;
        valueB = b.timeStamp;
      }

      if (direction === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
  };

  const toggleSortDirection = (criteria: 'timeStamp' | 'value') => {
    setSortCriteria(criteria);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const sortedTransactions = sortTransactions(transactionData, sortCriteria, sortDirection);
  const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <div className="space-y-8 overflow-x-auto">
      <h3 className="px-4 py-2 bg-primary text-white w-max rounded-lg">Transactions</h3>
      <Table className="border min-w-full">
        <TableCaption>List of last 100 transactions</TableCaption>
        <TableHeader className="text-sm">
          <TableRow>
            <TableHead>Transaction Hash</TableHead>
            <TableHead>Block</TableHead>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TableHead className="text-red-700 dark:text-red-200">Timestamp {sortCriteria === 'timeStamp' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</TableHead>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toggleSortDirection('timeStamp')}>
                  {sortCriteria === 'timeStamp' && sortDirection === 'asc' ? 'Latest to Earliest' : 'Earliest to Latest'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TableHead className="text-red-700 dark:text-red-200">Amount {sortCriteria === 'value' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</TableHead>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toggleSortDirection('value')}>{sortCriteria === 'value' && sortDirection === 'asc' ? 'Highest to Lowest' : 'Lowest to Highest'}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

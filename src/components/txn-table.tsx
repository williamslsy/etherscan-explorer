import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { formatDate } from '@/lib/utils';
import { transactionData } from '@/lib/constants';
import Link from 'next/link';
import { fetchAccountBalanceInEth } from '@/lib/server-utils';

export default async function TxnTable({ address }: { address: string }) {
  return (
    <div className="space-y-8">
      <h3 className="px-4 py-2 bg-biconomy text-white w-max rounded-lg">Transactions</h3>
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
            transactionData.map((transaction) => (
              <TableRow key={transaction.hash}>
                <TooltipProvider>
                  <TableCell>
                    {/* <Tooltip>
                      <TooltipTrigger>{transaction.hash ? `${transaction.hash.substring(0, 16)}...` : 'Loading...'}</TooltipTrigger>
                      <TooltipContent>{transaction.hash}</TooltipContent>
                    </Tooltip> */}
                    <Link href={`/txn-details/${transaction.hash}`}>{transaction.hash ? `${transaction.hash.substring(0, 16)}...` : 'Loading...'}</Link>
                  </TableCell>
                  <TableCell>{transaction.blockNumber}</TableCell>
                  <TableCell>{formatDate(transaction.timeStamp)}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>{transaction.from ? `${transaction.from.substring(0, 16)}...` : 'Loading...'}</TooltipTrigger>
                      <TooltipContent>{transaction.from}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>{transaction.to ? `${transaction.to.substring(0, 16)}...` : 'Loading...'}</TooltipTrigger>
                      <TooltipContent>{transaction.to}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{transaction.value}</TableCell>
                </TooltipProvider>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

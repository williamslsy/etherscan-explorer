import { formatFromNow, formatEthPrice } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { Link } from 'lucide-react';
import React from 'react';
import { TableRow, TableCell } from './ui/table';
import { Transaction } from '@/lib/types';

interface TxnCellProps {
  transaction: Transaction;
  address: string;
}

export default function TxnCells({ transaction, address }: TxnCellProps) {
  return (
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
  );
}

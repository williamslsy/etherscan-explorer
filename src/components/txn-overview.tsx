import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { cn, formatEthPrice, formatEthPriceInUsd, formatEtherPrice, formatFromNow, formatGasPriceToGwei, formatWeiToEth } from '@/lib/utils';
import Link from 'next/link';
import { fetchTransaction } from '@/lib/server-utils';
import { Transaction } from '@/lib/types';
import { ExternalLink } from 'lucide-react';

export default async function TxnOverview({ address, txnHash }: { address: string; txnHash: string }) {
  const selectedTransaction: Transaction = await fetchTransaction(address, txnHash);

  if (!selectedTransaction) return <div>Loading...</div>;

  const ethValue = selectedTransaction.value ? formatEthPrice(selectedTransaction.value) : '';

  const status = selectedTransaction?.txreceipt_status === '1' && selectedTransaction?.isError === '0' ? 'Success' : 'Failure';

  const transactionFeeInEth =
    selectedTransaction.gasPrice && selectedTransaction.gasUsed ? formatWeiToEth((BigInt(selectedTransaction.gasPrice) * BigInt(selectedTransaction.gasUsed)).toString()) : '0';

  return (
    <div className="mt-8">
      <Card className="border mt-8">
        <CardHeader className="text-lg font-semibold">Overview</CardHeader>
        <CardContent className="flex flex-col gap-6 text-sm">
          <div className="flex flex-col gap-1 break-words">
            <span className="opacity-70">Transaction Hash:</span>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-primary break-all">{txnHash}</span>
              <Link href={`https://etherscan.io/tx/${txnHash}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={15} />
              </Link>
            </div>
          </div>
          <p className="flex flex-col gap-1 break-words">
            <span className="opacity-70">Status </span>
            <span className={cn('text-primary', { 'text-green-500': status === 'Success' })}>{status}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="opacity-70">Block:</span>
            <span className="text-primary">{selectedTransaction.blockNumber} </span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="opacity-70">Timestamp:</span>
            <span className="text-primary">{formatFromNow(selectedTransaction.timeStamp * 1000)}</span>
          </p>
          <p className="flex flex-col gap-1 break-words">
            <span className="opacity-70">From:</span>
            <span className="text-primary break-all">{selectedTransaction.from}</span>
          </p>
          <p className="flex flex-col gap-1 break-words">
            <span className="opacity-70">To:</span>
            <span className="text-primary break-all">{selectedTransaction.to}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="opacity-70">Value:</span>
            <span className="text-primary">{ethValue} ETH </span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="opacity-70">Transaction Fee:</span>
            <span className="text-primary">{transactionFeeInEth} ETH</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="opacity-70">Gas Price:</span>
            <span className="text-primary">{formatGasPriceToGwei(selectedTransaction.gasPrice)} </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

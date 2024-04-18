import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { formatEthPrice } from '@/lib/utils';
export default function TxnOverview() {
  return (
    <div className="mt-8">
      <h2 className="py-6 border-b">
        <span className="font-light text-lg">Address:{'  '}</span>
        <span className="text-biconomy">{'0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5'}</span>
      </h2>
      <Card className="border mt-8">
        <CardHeader className="text-lg font-semibold">Overview</CardHeader>
        <CardContent className="flex flex-col gap-6 text-sm">
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">Transaction Hash:</span>
            <span>{'balanceInEth'} 0x</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">Status </span>
            <span>{'balanceInEth'} 0x</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">Block:</span>
            <span>{'balanceInEth'} 0x</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">Timestamp:</span>
            <span>{'balanceInEth'} 0x</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">From:</span>
            <span>{'balanceInEth'} 0x</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">To:</span>
            <span>{'balanceInEth'} 0x</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">Value:</span>
            <span>{'balanceInEth'} 0x</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">Transaction Fee:</span>
            <span>{'balanceInEth'} 0x</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">Gas Price:</span>
            <span>{'balanceInEth'} 0x</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">ETH Value</span>
            <span>$ {formatEthPrice('ethPrice')}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

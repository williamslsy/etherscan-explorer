import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { formatEthPrice } from '@/lib/utils';
import { fetchAccountBalanceInEth, fetchEthPrice } from '@/lib/server-utils';
export default async function Overview({ address }: { address: string }) {
  const balanceInEth = await fetchAccountBalanceInEth(address);
  console.log(balanceInEth);
  const ethPriceResults = await fetchEthPrice();
  const ethPrice = ethPriceResults?.result.ethusd;

  const ethValue = formatEthPrice(String(ethPrice * Number(balanceInEth)));

  return (
    <div className="mt-8">
      <h2 className="py-6 border-b">
        <span className="font-light text-lg">Address:{'  '}</span>
        <span className="text-biconomy">{address}</span>
      </h2>
      <Card className="border mt-8">
        <CardHeader className="text-lg font-semibold">Overview</CardHeader>
        <CardContent className="flex flex-col gap-6 text-sm">
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">ETH balance</span>
            <span>{balanceInEth} ETH</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">ETH Value</span>
            <span>
              ${ethValue} (@{formatEthPrice(String(ethPrice))})
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

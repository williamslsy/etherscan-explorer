import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { formatEthPriceInUsd } from '@/lib/utils';
import { fetchAccountBalanceInEth, fetchEthPrice } from '@/lib/server-utils';
import AddressSection from './address-section';

export default async function Overview({ address }: { address: string }) {
  const balanceInEth = await fetchAccountBalanceInEth(address);

  const ethPrice = await fetchEthPrice();

  const ethValue = balanceInEth && ethPrice ? formatEthPriceInUsd(Number(ethPrice) * Number(balanceInEth)) : '';

  return (
    <div className="mt-8">
      <AddressSection address={address} />
      <Card className="border mt-8">
        <CardHeader className="text-lg font-semibold">Overview</CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 text-sm">
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">ETH balance</span>
            <span>{balanceInEth} ETH</span>
          </p>
          <p className="flex flex-col gap-1 uppercase">
            <span className="opacity-70">ETH Value</span>
            <span>
              {ethValue} (@ {formatEthPriceInUsd(ethPrice)}/ETH)
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

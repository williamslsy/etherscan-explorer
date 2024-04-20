import React from 'react';

import { ModeToggle } from './theme-toggle/mode-toggle';
import { isValidData, formatEthPrice, formatEtherPrice } from '@/lib/utils';
import { useEthDetailsContext } from '@/context/EthDetailsContext';
import { fetchEthPrice, fetchGasPrice } from '@/lib/server-utils';

export default async function Header() {
  // const { ethPrice, gasPrice, loading } = useEthDetailsContext();
  const ethPrice = await fetchEthPrice();
  const gasPrice = await fetchGasPrice();
  return (
    <div className="w-11/12 lg:w-2/3 mx-auto flex justify-between items-center py-3 border-b text-sm text-opacity-60">
      <div className="flex items-center gap-8">
        {isValidData('ethPrice') && isValidData('gasPrice') ? (
          <>
            <h1>
              ETH Price: <span className="text-primary">${formatEtherPrice(ethPrice)}</span>
            </h1>
            {/* <p className="flex items-center gap-1">
              Gas Price: <span className="text-[#2e90cf]">{gasPrice} Gwei</span>
            </p> */}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="flex items-center gap-6">
        <ModeToggle />
      </div>
    </div>
  );
}

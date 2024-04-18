'use client';
import React from 'react';

import { ModeToggle } from './theme-toggle/mode-toggle';
import { isValidData, formatEthPrice } from '@/lib/utils';

export default function Header() {
  return (
    <div className="w-11/12 lg:w-2/3 mx-auto flex justify-between items-center py-3 border-b text-sm text-opacity-60">
      <div className="flex items-center gap-8">
        {isValidData('ethPrice') && isValidData('gasPrice') ? (
          <>
            <h1>
              ETH Price: <span className="text-[#2e90cf]">${formatEthPrice('ethPrice')}</span>
            </h1>
            <p className="flex items-center gap-1">
              Gas Price: <span className="text-[#2e90cf]">{'gasPrice'} Gwei</span>
            </p>
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

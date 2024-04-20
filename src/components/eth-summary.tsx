import React from 'react';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { Globe, Server } from 'lucide-react';
import { convertEthToBtc, formatEthPriceInUsd, formatEtherPrice } from '@/lib/utils';
import { useEthDetailsContext } from '@/context/EthDetailsContext';
import { fetchEthPrice } from '@/lib/server-utils';
import Link from 'next/link';

const EthSummary = async () => {
  // const { ethPrice, marketCap, loading } = useEthDetailsContext();
  const ethPrice = await fetchEthPrice();
  return (
    <div className="border bg-white dark:bg-black rounded-lg p-5 flex">
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-between gap-5 w-full">
          <div className="flex items-center gap-3">
            <Link href={'/'}>
              <Image src="/ethereum_icon.png" alt="ethereum_icon" width={100} height={100} className="w-10 h-10 animate-pulse" />
            </Link>
            <div className="flex flex-col gap-1 items-start text-opacity-70">
              <p className=" font-light uppercase text-sm">Ether Price</p>
              <p>
                <span className="text-opacity-100">{formatEthPriceInUsd(ethPrice)}</span> <span className="opacity-70 text-sm">@ {convertEthToBtc(ethPrice)} BTC</span>
              </p>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-3">
            {/* <Globe className="w-8 h-8" /> */}
            {/* <div className="flex flex-col gap-1 items-start text-opacity-70">
              <p className=" font-light uppercase text-sm">Market Cap</p>
              <span className="text-opacity-100">{formatEthPriceInUsd(marketCap.substring(0, 13))}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthSummary;

'use client';
import { fetchEthPrice, fetchGasPrice, fetchMarketCap } from '@/lib/server-utils';
import React, { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react';

interface EthContextProps {
  ethPrice: string;
  gasPrice: string;
  marketCap: string;
  loading: boolean;
}

interface Props {
  children: ReactNode;
}

const EthDetailsContext = createContext<EthContextProps>({
  ethPrice: '',
  gasPrice: '',
  marketCap: '',
  loading: false,
});

export const useEthDetailsContext = () => useContext(EthDetailsContext);

export const EthDetailsProvider: FC<Props> = ({ children }) => {
  const [ethPrice, setEthPrice] = useState<string>('');
  const [gasPrice, setGasPrice] = useState<string>('');
  const [marketCap, setMarketCap] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ethPriceData = await fetchEthPrice();
        const gasPriceData = await fetchGasPrice();
        const marketCapData = await fetchMarketCap();
        console.log(marketCapData, 'ethmc');

        setEthPrice(ethPriceData?.result?.ethusd || '');
        setGasPrice(gasPriceData?.result?.ProposeGasPrice || '');
        setMarketCap(marketCapData?.result || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <EthDetailsContext.Provider value={{ ethPrice, gasPrice, marketCap, loading }}>{children}</EthDetailsContext.Provider>;
};

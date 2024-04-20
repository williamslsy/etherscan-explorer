import { type ClassValue, clsx } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatEthPrice = (price: string) => {
  const balanceInEth = (parseFloat(price) / 1e18).toFixed(5);
  return balanceInEth;
};

export const formatEtherPrice = (price: string) => {
  return parseFloat(price || '0').toFixed(2);
};
export const formatEthPriceInUsd = (price: number | string): string => {
  const number = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const isValidData = (data: any) => {
  return typeof data === 'string' || typeof data === 'number';
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString();
};

export const formatFromNow = (timestamp: number) => {
  return moment(timestamp).fromNow();
};

export const ethToBtcConversionRate = 0.00001;

export const convertEthToBtc = (ethPrice: string) => {
  const ethValue = parseFloat(ethPrice || '0');
  const btcValue = ethValue * ethToBtcConversionRate;
  return btcValue.toFixed(4);
};

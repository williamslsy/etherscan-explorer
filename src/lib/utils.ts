import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatEthPrice = (price: string) => {
  return parseFloat(price || '0').toFixed(2);
};

export const isValidData = (data: any) => {
  return typeof data === 'string' || typeof data === 'number';
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString();
};

export const ethToBtcConversionRate = 0.00001;

export const convertEthToBtc = (ethPrice: string) => {
  const ethValue = parseFloat(ethPrice || '0');
  const btcValue = ethValue * ethToBtcConversionRate;
  return btcValue.toFixed(4);
};

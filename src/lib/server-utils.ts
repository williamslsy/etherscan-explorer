import { Transaction } from './types';

const API_BASE_URL = 'https://api.etherscan.io/api';

export async function fetchAccountBalanceInEth(address: string) {
  const apiUrl = `${API_BASE_URL}?module=account&action=balance&address=${address}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch data for ${address}. Status: ${res.status}`);
    }
    const data = await res.json();
    const balanceInEth = (parseFloat(data.result) / 1e18).toFixed(5);
    return balanceInEth;
  } catch (error: any) {
    console.error('Error fetching Eth Balance:', error);
    return null;
  }
}

export const fetchEthPrice = async () => {
  const apiUrl = `${API_BASE_URL}?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch Ethereum price. Status: ${response.status}`);
    }
    const data = await response.json();
    return data.result.ethusd;
  } catch (error) {
    console.error('Error fetching Ethereum price: ', error);
    return null;
  }
};

export const fetchAccountTransactions = async (address: string, page: number = 1, offset: number = 10) => {
  const apiUrl = `${API_BASE_URL}?module=account&action=txlist&address=${address}&page=${page}&offset=${offset}&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions for ${address}. Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.result && data.result.length > 0) {
      return data.result;
    }
    throw new Error('No transactions found.');
  } catch (error) {
    console.error('Error fetching transactions: ', error);
    return null;
  }
};

const findTransactionByHash = (transactions: Transaction[], txnHash: string): Transaction | null => {
  const transaction = transactions.find((t) => t.hash === txnHash);
  return transaction || null;
};

export const fetchTransaction = async (address: string, txnHash?: string) => {
  const transaction = await fetchAccountTransactions(address);
  if (!transaction) return null;

  if (txnHash) {
    return findTransactionByHash(transaction, txnHash);
  }

  return transaction;
};

export const fetchGasPrice = async () => {
  const apiUrl = `${API_BASE_URL}?module=gastracker&action=gasoracle&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch gas price. Status: ${response.status}`);
    }
    const data = await response.json();

    return data?.result?.ProposeGasPrice;
  } catch (error) {
    console.error('Error fetching gas price: ', error);
    return null;
  }
};

export const fetchMarketCap = async () => {
  const apiUrl = `${API_BASE_URL}?module=stats&action=ethsupply&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch market cap. Status: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching market cap: ', error);
    return null;
  }
};

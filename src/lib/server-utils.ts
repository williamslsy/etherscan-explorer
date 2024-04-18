import { toast } from '@/components/ui/use-toast';
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
    console.error(error);
    toast({
      title: 'Error',
      description: error.message || `An error occurred while fetching balance for ${address}.`,
    });
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
    return data;
  } catch (error) {
    console.error('Error fetching Ethereum price: ', error);
    return null;
  }
};

export const fetchAccountTransactions = async (address: string) => {
  const apiUrl = `${API_BASE_URL}?module=account&action=txlist&address=${address}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions for ${address}. Status: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching account transactions: ', error);
    return null;
  }
};

export const fetchGasPrice = async () => {
  const apiUrl = `${API_BASE_URL}?module=gastracker&action=gasoracle&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch gas price. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
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
    return data;
  } catch (error) {
    console.error('Error fetching market cap: ', error);
    return null;
  }
};

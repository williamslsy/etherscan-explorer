import { useState, useEffect } from 'react';
import { fetchAccountTransactions } from '@/lib/server-utils';
import { Transaction } from '@/lib/types';

const useTransactions = (address: string, txnHash: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAndSetTransactions() {
      const txnData = await fetchAccountTransactions(address);
      if (isMounted) {
        setTransactions(txnData as Transaction[]);
      }
    }

    if (address) {
      fetchAndSetTransactions();
    }

    return () => {
      isMounted = false;
    };
  }, [address]);

  useEffect(() => {
    if (txnHash) {
      const txn = transactions.find((t) => t.hash === txnHash);
      setSelectedTransaction(txn || null);
    }
  }, [transactions, txnHash]);

  return { transactions, selectedTransaction };
};

export default useTransactions;

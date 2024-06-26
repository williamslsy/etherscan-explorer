import EthSummary from '@/components/eth-summary';
import Overview from '@/components/overview';
import TxnTable from '@/components/txn-table';
import { fetchAccountTransactions } from '@/lib/server-utils';
import { Transaction } from '@/lib/types';
import React, { Suspense } from 'react';
import Loading from './loading';

export default async function Page({ params }: { params: { address: string } }) {
  const { address } = params;
  const transactionData: Transaction[] = (await fetchAccountTransactions(address, 1, 100)) as Transaction[];

  return (
    <main className=" dark:bg-slate-950">
      <div className="w-11/12 lg:w-2/3 mx-auto space-y-8 -translate-y-6 z-50">
        <EthSummary />
        <Overview address={address} />

        <Suspense key={address} fallback={<Loading />}>
          <TxnTable address={address} transactionData={transactionData} />
        </Suspense>
      </div>
    </main>
  );
}

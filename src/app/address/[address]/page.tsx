import Overview from '@/components/overview';
import TxnTable from '@/components/txn-table';
import React from 'react';

export default function Page({ params }: { params: { address: string } }) {
  const { address } = params;

  return (
    <main className=" dark:bg-slate-950">
      <div className="w-11/12 lg:w-2/3 mx-auto space-y-8 -translate-y-6 z-50">
        <Overview address={address} />
        <TxnTable address={address} />
      </div>
    </main>
  );
}

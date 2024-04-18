import TxnOverview from '@/components/txn-overview';
import React from 'react';

export default function Page() {
  return (
    <main className=" dark:bg-slate-950">
      <div className="w-11/12 lg:w-2/3 mx-auto space-y-8 -translate-y-6 z-50">
        <TxnOverview />
      </div>
    </main>
  );
}

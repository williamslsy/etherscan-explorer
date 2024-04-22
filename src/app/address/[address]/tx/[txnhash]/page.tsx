import EthSummary from '@/components/eth-summary';
import TxnOverview from '@/components/txn-overview';
import { Suspense } from 'react';
import Loading from '../../loading';

export default function Page({ params }: { params: { txnhash: string; address: string } }) {
  const { txnhash, address } = params;

  return (
    <main className=" dark:bg-slate-950">
      <div className="w-11/12 lg:w-2/3 mx-auto space-y-8 -translate-y-6 z-50">
        <EthSummary />
        <Suspense key={address} fallback={<Loading />}>
          <TxnOverview address={address} txnHash={txnhash} />
        </Suspense>
      </div>
    </main>
  );
}

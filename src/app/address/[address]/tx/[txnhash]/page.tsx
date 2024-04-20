import EthSummary from '@/components/eth-summary';
import TxnOverview from '@/components/txn-overview';

export default function Page({ params }: { params: { txnhash: string; address: string } }) {
  const { txnhash, address } = params;

  return (
    <main className=" dark:bg-slate-950">
      <div className="w-11/12 lg:w-2/3 mx-auto space-y-8 -translate-y-6 z-50">
        <EthSummary />
        <TxnOverview address={address} txnHash={txnhash} />
      </div>
    </main>
  );
}

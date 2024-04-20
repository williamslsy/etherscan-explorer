import EthSummary from '@/components/eth-summary';
export default function Home() {
  return (
    <main className=" dark:bg-slate-950">
      <div className="w-11/12 lg:w-2/3 mx-auto space-y-8 -translate-y-6 z-50">
        <EthSummary />
      </div>
    </main>
  );
}

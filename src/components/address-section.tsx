'use client';
import useClipboard from '@/hooks/useClipboard';
import { CheckCheck, Copy, ExternalLink } from 'lucide-react';

export default function AddressSection({ address }: { address: string }) {
  const { isCopied, copyToClipboard } = useClipboard();

  const handleCopyClick = () => {
    copyToClipboard(address);
  };

  return (
    <section>
      <h2 className="py-6 border-b flex items-center gap-2">
        <span className="font-light text-lg">Address:{'  '}</span>
        <span className="text-primary">{address}</span>
        <span className="hover:shadow-lg rounded-lg cursor-pointer" onClick={handleCopyClick}>
          {isCopied ? <CheckCheck size={15} color="green" /> : <Copy size={15} />}
        </span>
      </h2>
    </section>
  );
}

import { useState } from 'react';

const useClipboard = (timeoutDuration = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard!');
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, timeoutDuration);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return { isCopied, copyToClipboard };
};

export default useClipboard;

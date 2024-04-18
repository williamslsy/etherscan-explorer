'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-toggle/theme-provider';
import Header from '@/components/header';
import SearchArea from '@/components/search-area';
import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'simple etherscan clone',
//   description: 'A simple etherscan clone built with Next.js and Tailwind CSS.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [accountAddress, setAccountAddress] = useState('');

  const handleSearch = (address: string) => {
    setAccountAddress(address);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <SearchArea onSearch={handleSearch} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

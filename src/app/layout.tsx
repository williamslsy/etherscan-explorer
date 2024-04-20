import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-toggle/theme-provider';
import Header from '@/components/header';
import SearchArea from '@/components/search-area';
import { Toaster } from '@/components/ui/toaster';
import EthSummary from '@/components/eth-summary';
import { EthDetailsProvider } from '@/context/EthDetailsContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'simple etherscan clone',
  description: 'A simple etherscan clone built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EthDetailsProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <SearchArea />
            {children}
            <Toaster />
          </ThemeProvider>
        </EthDetailsProvider>
      </body>
    </html>
  );
}

'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchAreaProps {
  onSearch: (value: string) => void;
}

export default function SearchArea({ onSearch }: SearchAreaProps) {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    onSearch(searchValue);
    router.push(`/address/${searchValue}`);
  };

  return (
    <div className="h-[30vh] md:h-[25vh] w-full bg-[#05152e] flex flex-col items-left justify-center relative">
      <video autoPlay muted playsInline loop className="absolute w-full h-full object-cover opacity-50">
        <source src="https://dl.dropboxusercontent.com/s/tjyvmis0b0f7f9s/biconomy_bg-1.mp4?dl=0" type="video/mp4" />
      </video>
      <div className="z-50 px-4 sm:px-8 w-full sm:w-2/3 md:w-1/2 mx-auto space-y-2">
        <h1 className="font-bold text-xl text-white">The Ethereum Blockchain Explorer</h1>
        <div className="p-2 bg-white dark:bg-black rounded-lg flex justify-between gap-2">
          <Input placeholder="Search by Address" className="w-full dark:bg-black" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <Button className="bg-biconomy p-2" onClick={handleSearch}>
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from './ui/use-toast';

export default function SearchArea() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    const inputText = e.target.value;
    try {
      if (inputText === '' || addressRegex.test(inputText)) {
        setSearchValue(inputText);
      } else {
        throw new Error('Invalid address format.');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Invalid input',
        duration: 1000,
      });
    }
  };

  const handleSearch = () => {
    if (!searchValue) return;
    setSearchValue('');
    router.push(`/address/${searchValue}`);
  };

  return (
    <div className="h-[30vh] md:h-[25vh] w-full bg-[#05152e] flex flex-col items-left justify-center relative">
      <video autoPlay muted playsInline loop className="absolute w-full h-full object-cover opacity-50">
        <source src="https://dl.dropboxusercontent.com/s/tjyvmis0b0f7f9s/primary_bg-1.mp4?dl=0" type="video/mp4" />
      </video>
      <div className="z-50 px-4 sm:px-8 w-full sm:w-2/3 md:w-1/2 mx-auto space-y-2">
        <Link href={`/`} className="font-bold text-xl text-white">
          The Ethereum Blockchain Explorer
        </Link>
        <div className="p-2 bg-white dark:bg-black rounded-lg flex justify-between gap-2 relative">
          <Input placeholder="Search by Address" className="w-full dark:bg-black" value={searchValue} onChange={onChangeText} />
          {searchValue && (
            <button onClick={() => setSearchValue('')} className="font-bold absolute right-12 inset-y-0 px-4 hidden md:flex items-center justify-center text-black dark:text-white">
              x
            </button>
          )}
          <Button className="bg-primary p-2" onClick={handleSearch}>
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
}

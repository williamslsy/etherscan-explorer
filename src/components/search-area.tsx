'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SearchArea() {
  const [searchValue, setSearchValue] = useState('0x57b69EE64F985ea2f62BDdf8bD6233262b543410');
  const router = useRouter();

  const handleSearch = () => {
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
          <Input placeholder="Search by Address" className="w-full dark:bg-black" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
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

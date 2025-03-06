'use client';

import { UseCountContext } from '@/context/CountContext';
import { IconSearch } from '@/components/ui/icons';
import { FormEvent, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Searcher() {
  const { count } = UseCountContext();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchValue(query);
    }
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    if (trimmedValue) {
      router.push(`/search?q=${encodeURIComponent(trimmedValue)}`);
    }
  };

  return (
    <div className='search-container flex flex-col justify-center md:mb-8 mb-4 md:mb-0'>
      <form onSubmit={handleSubmit} className='search-form flex items-center'>
        <i className='search-icon'>
          <IconSearch height={12} width={12} />
        </i>
        <input
          className='search flex-auto pl-3 outline-none uppercase'
          type='text'
          placeholder='Search a character...'
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </form>

      <span className='search-counter uppercase mt-2 text-xs'>
        {count || 0} results
      </span>
    </div>
  );
}

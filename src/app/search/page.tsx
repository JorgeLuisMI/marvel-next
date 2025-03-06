'use client';

import { Suspense } from 'react';
import { getCharacters } from '@/api/getCharacters';
import { TypeSuperHero } from '@/types';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Searcher from '@/components/layout/searcher';
import Grid from '@/components/layout/grid';

function SearchContent() {
  const [characters, setCharacters] = useState<TypeSuperHero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      try {
        if (!searchQuery?.trim()) {
          router.replace('/');
          return;
        }
        const results = await getCharacters({ name: searchQuery.trim() });
        if (isMounted) {
          setCharacters(results);
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
        if (isMounted) {
          setCharacters([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCharacters();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, router]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-xl'>Loading characters...</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <Searcher />
      <Grid characters={characters} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-xl'>Loading...</div>
        </div>
      }>
      <SearchContent />
    </Suspense>
  );
}

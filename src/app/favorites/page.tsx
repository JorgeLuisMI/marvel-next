'use client';

import { Suspense } from 'react';
import { UseFavoritesContext } from '@/context/FavoritesContext';
import { getCharacterById } from '@/api/getCharacters';
import { TypeSuperHero } from '@/types';
import { useEffect, useState } from 'react';
import Searcher from '@/components/layout/searcher';
import Grid from '@/components/layout/grid';

function FavoritesContent() {
  const { favorites } = UseFavoritesContext();
  const [characters, setCharacters] = useState<TypeSuperHero[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (favorites.length === 0) {
          setCharacters([]);
          setIsLoading(false);
          return;
        }

        const results = await Promise.all(
          favorites.map((id: string) => getCharacterById(id))
        );
        const favoriteCharacters = results
          .map((result: TypeSuperHero[]) => result[0])
          .filter(
            (
              character: TypeSuperHero | undefined
            ): character is TypeSuperHero => character !== undefined
          );

        setCharacters(favoriteCharacters);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-xl'>Loading favorites...</div>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-xl'>
          You don&apos;t have any favorite characters
        </div>
      </div>
    );
  }

  return <Grid characters={characters} />;
}

export default function FavoritesPage() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-xl'>Loading...</div>
        </div>
      }>
      <h1 className='favorites-title text-3xl font-bold uppercase md:mb-6'>
        Favorites
      </h1>
      <Searcher />
      <FavoritesContent />
    </Suspense>
  );
}

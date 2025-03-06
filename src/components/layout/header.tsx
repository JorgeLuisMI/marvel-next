'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UseFavoritesContext } from '@/context/FavoritesContext';
import { IconFavoriteRed, IconFavoriteWhite } from '@/components/ui/icons';

export default function Header() {
  const { favoritesCount } = UseFavoritesContext();

  return (
    <header className='sticky top-0 z-2 w-full bg-black flex justify-between items-center py-4 px-4 md:px-12 border-b border-white/20'>
      <div className='mr-4 flex'>
        <Link href='/'>
          <Image
            src='/logo-marvel.png'
            alt='Marvel Logo'
            width={130}
            height={52}
          />
        </Link>
      </div>
      <div className='flex items-center gap-4'>
        <Link href='/favorites'>
          <div className='flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary'>
            {favoritesCount >= 1 ? (
              <>
                <IconFavoriteRed height={21} />
                <span className='hidden md:inline-block'>{favoritesCount}</span>
              </>
            ) : (
              <IconFavoriteWhite height={21} />
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}

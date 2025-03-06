'use client';

import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '@/components/layout/favorite-button';
import React from 'react';
import { TypeCardProps } from '@/types';

export function Card({ name, image, id }: TypeCardProps) {
  const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  });

  CardContent.displayName = 'CardContent';

  const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  });

  CardFooter.displayName = 'CardFooter';

  return (
    <Link href={`/details/${id}`} className='group relative'>
      <div className='card flex flex-col relative hover:shadow-xl shadow-gray-500 cursor-pointer'>
        <CardContent className='card-content relative flex justify-center items-center'>
          {image && (
            <Image src={image} alt='Marvel' width={300} height={450} priority />
          )}
        </CardContent>
        <CardFooter className='card-footer flex justify-between items-center bg-black px-3'>
          <div className='card-name text-white uppercase'>{name}</div>
          <div className='flex justify-center items-center'>
            <FavoriteButton
              classButton='card-favorite-button cursor-pointer h-5 w-5 flex justify-center items-center'
              id={id.toString()}
              h={12}
            />
          </div>
        </CardFooter>
        <div className='card-footer-triangle absolute' />
      </div>
    </Link>
  );
}

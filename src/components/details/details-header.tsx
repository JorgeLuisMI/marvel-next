import React from 'react';
import Image from 'next/image';
import { getCharacterById } from '@/api/getCharacters';
import { notFound } from 'next/navigation';
import FavoriteButton from '@/components/layout/favorite-button';
import { TypeDetailsPageProps } from '@/types';

export default async function DetailsHeader({ params }: TypeDetailsPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const data = await getCharacterById(id);

  if (!data || data.length === 0) {
    notFound();
  }

  const character = data[0];

  return (
    <div className='details-header bg-black'>
      <div className='card-footer-triangle-lg absolute'></div>
      <div className='container relative mx-auto'>
        <div className='flex flex-col md:flex-row'>
          <div className='details-header-img'>
            <Image
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              width={500}
              height={750}
            />
            <div className='details-header-favorite'>
              <FavoriteButton
                id={character.id.toString()}
                h={21}
                classButton=''
              />
            </div>
          </div>
          <div className='details-header-content text-white flex flex-col justify-center md:ml-14'>
            <h1 className='md:text-6xl text-3xl font-bold mb-4'>
              {character.name}
            </h1>
            <p className='text-1xl'>{character.description}</p>
          </div>
          <div className='details-header-favorite'>
            <FavoriteButton
              id={character.id.toString()}
              h={21}
              classButton=''
            />
          </div>
        </div>
      </div>
    </div>
  );
}

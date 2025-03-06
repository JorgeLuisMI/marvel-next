import React, { Suspense } from 'react';
import Image from 'next/image';
import { getCharacterById } from '@/api/getCharacters';
import { getComicsByCharacterId } from '@/api/getCharacters';
import { notFound } from 'next/navigation';
import { TypeDetailsPageProps, TypeComic } from '@/types';

export default async function DetailsContent({ params }: TypeDetailsPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const data = await getCharacterById(id);
  const comics = await getComicsByCharacterId(id);

  if (!data || data.length === 0) {
    notFound();
  }

  return (
    <div>
      <div className='container mx-auto py-14'>
        <h1 className='details-content-title text-3xl font-bold uppercase'>
          Comics
        </h1>
        <div className='details-slider mt-7 pb-7'>
          <Suspense fallback={<div>Loading...</div>}>
            {comics.map((comic: TypeComic) => (
              <div key={comic.resourceURI} className='details-slide-card'>
                <div className='details-slide-image'>
                  <Image
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt='Comic photo'
                    width={150}
                    height={150}
                  />
                </div>
                <div className='details-slide-title mt-2'>
                  <h3 className='text-sm font-bold'>{comic.title}</h3>
                  <span>
                    {new Intl.DateTimeFormat('en', {
                      year: 'numeric',
                    }).format(new Date(comic.dates[0].date))}
                  </span>
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

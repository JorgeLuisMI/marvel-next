'use client';

import { UseCountContext } from '@/context/CountContext';
import { Card } from '@/components/ui/card';
import { TypeGridCardsProps, TypeSuperHero } from '@/types';
import { useEffect } from 'react';

export default function GridCards({ characters }: TypeGridCardsProps) {
  const { setCount } = UseCountContext();

  useEffect(() => {
    setCount(characters.length);
  }, [characters, setCount]);

  return (
    <>
      {characters.map((character: TypeSuperHero) => (
        <Card
          key={character.id}
          name={character.name}
          image={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
          id={character.id.toString()}
        />
      ))}
    </>
  );
}

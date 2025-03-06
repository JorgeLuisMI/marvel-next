import { Suspense } from 'react';
import Grid from '@/components/layout/grid';
import Searcher from '@/components/layout/searcher';
import { getCharacters } from '@/api/getCharacters';

export default async function HomeContent() {
  const characters = await getCharacters({ limit: 50 });

  return (
    <div className='flex flex-col'>
      <Suspense>
        <Searcher />
      </Suspense>
      <Grid characters={characters} />
    </div>
  );
}

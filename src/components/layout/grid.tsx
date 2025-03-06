import GridCards from '@/components/layout/grid-cards';
import { TypeSuperHero } from '@/types';

export default function Grid({ characters }: { characters: TypeSuperHero[] }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4'>
      <GridCards characters={characters} />
    </div>
  );
}

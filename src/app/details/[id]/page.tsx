import DetailsHeader from '@/components/details/details-header';
import DetailsContent from '@/components/details/details-content';
import { TypeDetailsPageProps } from '@/types';

export default async function DetailsPage({ params }: TypeDetailsPageProps) {
  return (
    <div>
      <DetailsHeader params={params} />
      <DetailsContent params={params} />
    </div>
  );
}

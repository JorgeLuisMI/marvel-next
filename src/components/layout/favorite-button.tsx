'use client';

import { UseFavoritesContext } from '@/context/FavoritesContext';
import { IconFavoriteRed, IconFavoriteWhite } from '@/components/ui/icons';
import { TypeFavoriteProps } from '@/types';

export default function FavoriteButton({
  id,
  h,
  classButton,
  onToggle,
}: TypeFavoriteProps) {
  const { isFavorite, addFavorite, removeFavorite } = UseFavoritesContext();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
    onToggle?.(!isFavorite(id));

    const button = e.currentTarget;
    button.classList.add('bouncing');
    setTimeout(() => {
      button.classList.remove('bouncing');
    }, 800);
  };

  return (
    <button className={`${classButton}`} onClick={handleFavoriteClick}>
      {id && isFavorite(id) ? (
        <IconFavoriteRed height={h || 21} />
      ) : (
        <IconFavoriteWhite height={h || 21} />
      )}
    </button>
  );
}

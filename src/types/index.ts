import { Dispatch, SetStateAction } from 'react';

export interface TypeSuperHero {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  createdAt: string;
  likesCount: number;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  comments: Comment[];
  isLiked: boolean;
  isSaved: boolean;
}

export interface TypeCountContext {
  count: number | null;
  setCount: Dispatch<SetStateAction<number | null>>;
}

export interface TypeCharacterSearchParams {
  name?: string;
  limit?: number;
}

export interface TypeFavoritesContext {
  favorites: string[];
  favoritesCount: number;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export interface TypeComic {
  resourceURI: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  title: string;
  dates: {
    date: string;
  }[];
}

export interface TypeDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface TypeFavoriteProps {
  id: string;
  h: number;
  classButton: string;
  onToggle?: (newState: boolean) => void;
}

export interface TypeGridCardsProps {
  characters: TypeSuperHero[];
}

export interface TypeCardProps {
  name: string;
  image: string;
  id: string;
}

export interface TypeCacheData<T> {
  data: T;
  timestamp: number;
}

export interface TypeIconsProps {
  height?: number;
  width?: number;
}

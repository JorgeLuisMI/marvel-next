import { TypeSuperHero, TypeCharacterSearchParams, TypeComic } from '@/types';
import { getCache, setCache, CACHE_KEYS } from '@/utils/cache';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
const NEXT_PUBLIC_API_HASH = process.env.NEXT_PUBLIC_API_HASH || '';
const NEXT_PUBLIC_API_TS = process.env.NEXT_PUBLIC_API_TS || '';

export async function getCharacters({
  name,
  limit = 50,
}: TypeCharacterSearchParams): Promise<TypeSuperHero[]> {
  const cacheKey = name
    ? `${CACHE_KEYS.CHARACTERS}_${name}`
    : CACHE_KEYS.CHARACTERS;

  const cachedData = getCache<TypeSuperHero[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const url = new URL(`${NEXT_PUBLIC_API_URL}/characters`);
    url.searchParams.append('ts', NEXT_PUBLIC_API_TS);
    url.searchParams.append('apikey', NEXT_PUBLIC_API_KEY);
    url.searchParams.append('hash', NEXT_PUBLIC_API_HASH);
    url.searchParams.append('limit', limit.toString());

    const randomNumber = Math.floor(Math.random() * Math.floor(1000));
    url.searchParams.append('offset', randomNumber.toString());

    if (name && name.trim()) {
      url.searchParams.append('nameStartsWith', name.trim());
    }

    // console.log('Fetching URL:', url.toString());
    const response = await fetch(url.toString());

    if (!response.ok) {
      // console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log('API Response:', data);

    if (!data?.data?.results) {
      throw new Error('Invalid API response format');
    }

    const results = data.data.results;
    setCache(cacheKey, results);
    return results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}

export async function getCharacterById(id: string): Promise<TypeSuperHero[]> {
  const cacheKey = CACHE_KEYS.CHARACTER_DETAIL(id);
  const cachedData = getCache<TypeSuperHero[]>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/characters/${id}?ts=${NEXT_PUBLIC_API_TS}&apikey=${NEXT_PUBLIC_API_KEY}&hash=${NEXT_PUBLIC_API_HASH}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.data?.results) {
      throw new Error('Invalid API response format');
    }

    const results = data.data.results;
    setCache(cacheKey, results);
    return results;
  } catch (error) {
    console.error('Error fetching character details:', error);
    return [];
  }
}

export async function getComicsByCharacterId(id: string): Promise<TypeComic[]> {
  const cacheKey = `${CACHE_KEYS.CHARACTER_DETAIL(id)}_comics`;
  const cachedData = getCache<TypeComic[]>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/characters/${id}/comics?ts=${NEXT_PUBLIC_API_TS}&apikey=${NEXT_PUBLIC_API_KEY}&hash=${NEXT_PUBLIC_API_HASH}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.data?.results) {
      throw new Error('Invalid API response format');
    }

    const results = data.data.results;
    setCache(cacheKey, results);
    return results;
  } catch (error) {
    console.error('Error fetching comics:', error);
    return [];
  }
}

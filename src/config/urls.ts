export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

export const API_URLS = {
  favorites: `${getBaseUrl()}/api/favorites`,
  characters: 'https://gateway.marvel.com/v1/public',
} as const;

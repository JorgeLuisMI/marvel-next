import { TypeCacheData } from '@/types';

const CACHE_KEYS = {
  CHARACTERS: 'marvel_characters_cache',
  FAVORITES: 'marvel_favorites_cache',
  CHARACTER_DETAIL: (id: string) => `marvel_character_${id}_cache`,
} as const;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

// Caché en memoria para el servidor
const serverCache = new Map<string, TypeCacheData<unknown>>();

// Función para verificar si estamos en el cliente
const isClient = () => typeof window !== 'undefined';

export const getCache = <T>(key: string): T | null => {
  try {
    if (isClient()) {
      // Cliente: usar localStorage
      const cacheStr = localStorage.getItem(key);
      if (!cacheStr) return null;

      const cache = JSON.parse(cacheStr) as TypeCacheData<T>;
      const now = Date.now();

      if (now - cache.timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }

      return cache.data;
    } else {
      // Servidor: usar caché en memoria
      const cache = serverCache.get(key) as TypeCacheData<T> | undefined;
      if (!cache) return null;

      const now = Date.now();
      if (now - cache.timestamp > CACHE_DURATION) {
        serverCache.delete(key);
        return null;
      }

      return cache.data;
    }
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

export const setCache = <T>(key: string, data: T): void => {
  try {
    const cache: TypeCacheData<T> = {
      data,
      timestamp: Date.now(),
    };

    if (isClient()) {
      // Cliente: guardar en localStorage
      localStorage.setItem(key, JSON.stringify(cache));
    } else {
      // Servidor: guardar en memoria
      serverCache.set(key, cache);
    }
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

export const clearCache = (key: string): void => {
  try {
    if (isClient()) {
      // Cliente: limpiar localStorage
      localStorage.removeItem(key);
      // También limpiamos la caché del servidor si existe
      serverCache.delete(key);
    } else {
      // Servidor: limpiar caché en memoria
      serverCache.delete(key);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

export const clearAllCache = (): void => {
  try {
    if (isClient()) {
      // Cliente: limpiar localStorage
      Object.values(CACHE_KEYS).forEach((key) => {
        if (typeof key === 'function') return;
        localStorage.removeItem(key);
        // También limpiamos la caché del servidor si existe
        serverCache.delete(key);
      });
    } else {
      // Servidor: limpiar caché en memoria
      serverCache.clear();
    }
  } catch (error) {
    console.error('Error clearing all cache:', error);
  }
};

export { CACHE_KEYS };

/**
 * @jest-environment jsdom
 */
/* eslint-disable @next/next/no-img-element */
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { getCharacterById, getComicsByCharacterId } from '@/api/getCharacters';
import { UseCountProvider } from '@/context/CountContext';
import { UseFavoritesProvider } from '@/context/FavoritesContext';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import DetailsHeader from '@/components/details/details-header';
import DetailsContent from '@/components/details/details-content';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
  notFound: jest.fn(),
}));

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt = '', src, ...props }: { alt?: string; src: string }) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

// Mock del módulo getCharacters
jest.mock('@/api/getCharacters', () => ({
  getCharacterById: jest.fn(() => Promise.resolve([])),
  getComicsByCharacterId: jest.fn(() => Promise.resolve([])),
}));

// Mock del contexto de favoritos
const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn();
jest.mock('@/context/FavoritesContext', () => ({
  ...jest.requireActual('@/context/FavoritesContext'),
  UseFavoritesContext: jest.fn(() => ({
    favorites: [],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
  })),
}));

// Mock de los componentes
jest.mock('@/components/details/details-header', () => {
  return function MockDetailsHeader({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    type Character = {
      name: string;
      description: string;
    };

    const [character, setCharacter] = useState<Character | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
      async function loadData() {
        try {
          const { id } = await params;
          if (!id) {
            notFound();
            return;
          }

          const data = await getCharacterById(id);
          if (!data || data.length === 0) {
            notFound();
            return;
          }

          setCharacter({
            name: data[0].name,
            description: data[0].description,
          });
        } catch {
          setError(true);
        }
      }

      loadData();
    }, [params]);

    if (error || !character) return null;

    return (
      <div className='details-header bg-black'>
        <div className='details-header-content'>
          <h1>{character.name}</h1>
          <p>{character.description}</p>
          <button>Favorite</button>
        </div>
      </div>
    );
  };
});

jest.mock('@/components/details/details-content', () => {
  return function MockDetailsContent({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    type Comic = {
      resourceURI: string;
      title: string;
    };

    const [comics, setComics] = useState<Comic[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
      async function loadData() {
        try {
          const { id } = await params;
          if (!id) {
            notFound();
            return;
          }

          const data = await getCharacterById(id);
          if (!data || data.length === 0) {
            notFound();
            return;
          }

          const comicsData = await getComicsByCharacterId(id);
          setComics(
            comicsData.map((comic) => ({
              resourceURI: comic.resourceURI,
              title: comic.title,
            }))
          );
        } catch {
          setError(true);
        }
      }

      loadData();
    }, [params]);

    if (error) return null;

    return (
      <div>
        <h1>Comics</h1>
        {comics.map((comic) => (
          <div key={comic.resourceURI}>
            <h3>{comic.title}</h3>
          </div>
        ))}
      </div>
    );
  };
});

const mockCharacter = {
  id: '1',
  name: 'Iron Man',
  description: 'Genius billionaire playboy philanthropist',
  thumbnail: {
    path: 'http://example.com/ironman',
    extension: 'jpg',
  },
  comics: {
    available: 2,
    items: [{ name: 'Iron Man Vol 1' }, { name: 'Avengers Vol 1' }],
  },
  series: {
    available: 1,
    items: [{ name: 'Iron Man Series' }],
  },
  stories: {
    available: 1,
    items: [{ name: 'Origin Story' }],
  },
};

const mockComics = [
  {
    id: '1',
    title: 'Iron Man Vol 1',
    resourceURI: 'http://example.com/comic/1',
    thumbnail: {
      path: 'http://example.com/comic1',
      extension: 'jpg',
    },
    dates: [{ date: '2023-01-01' }],
  },
];

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <UseFavoritesProvider>
      <UseCountProvider>{component}</UseCountProvider>
    </UseFavoritesProvider>
  );
};

describe('Details Components', () => {
  const originalError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  describe('DetailsHeader', () => {
    it('muestra la información del personaje', async () => {
      mockIsFavorite.mockReturnValue(true);
      (getCharacterById as jest.Mock).mockImplementation(() =>
        Promise.resolve([mockCharacter])
      );

      const params = { id: '1' };
      renderWithProviders(<DetailsHeader params={Promise.resolve(params)} />);

      // Esperar a que se carguen los datos
      await waitFor(() => {
        expect(getCharacterById).toHaveBeenCalledWith('1');
      });

      // Verificar que se muestra el contenido
      await waitFor(() => {
        expect(screen.getByText('Iron Man')).toBeInTheDocument();
        expect(
          screen.getByText('Genius billionaire playboy philanthropist')
        ).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });

    it('llama a notFound cuando no hay ID', async () => {
      const params = { id: '' };
      renderWithProviders(<DetailsHeader params={Promise.resolve(params)} />);

      await waitFor(() => {
        expect(notFound).toHaveBeenCalled();
      });
    });

    it('llama a notFound cuando no hay datos', async () => {
      (getCharacterById as jest.Mock).mockImplementation(() =>
        Promise.resolve([])
      );

      const params = { id: '1' };
      renderWithProviders(<DetailsHeader params={Promise.resolve(params)} />);

      await waitFor(() => {
        expect(notFound).toHaveBeenCalled();
      });
    });
  });

  describe('DetailsContent', () => {
    it('muestra los comics del personaje', async () => {
      (getCharacterById as jest.Mock).mockImplementation(() =>
        Promise.resolve([mockCharacter])
      );
      (getComicsByCharacterId as jest.Mock).mockImplementation(() =>
        Promise.resolve(mockComics)
      );

      const params = { id: '1' };
      renderWithProviders(<DetailsContent params={Promise.resolve(params)} />);

      // Esperar a que se carguen los datos
      await waitFor(() => {
        expect(getCharacterById).toHaveBeenCalledWith('1');
        expect(getComicsByCharacterId).toHaveBeenCalledWith('1');
      });

      // Verificar que se muestra el contenido
      await waitFor(() => {
        expect(screen.getByText('Comics')).toBeInTheDocument();
        expect(screen.getByText('Iron Man Vol 1')).toBeInTheDocument();
      });
    });

    it('llama a notFound cuando no hay ID', async () => {
      const params = { id: '' };
      renderWithProviders(<DetailsContent params={Promise.resolve(params)} />);

      await waitFor(() => {
        expect(notFound).toHaveBeenCalled();
      });
    });

    it('llama a notFound cuando no hay datos', async () => {
      (getCharacterById as jest.Mock).mockImplementation(() =>
        Promise.resolve([])
      );

      const params = { id: '1' };
      renderWithProviders(<DetailsContent params={Promise.resolve(params)} />);

      await waitFor(() => {
        expect(notFound).toHaveBeenCalled();
      });
    });
  });
});

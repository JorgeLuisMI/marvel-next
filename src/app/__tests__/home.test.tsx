/**
 * @jest-environment jsdom
 */
/* eslint-disable @next/next/no-img-element */
import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { getCharacters } from '@/api/getCharacters';
import { UseCountProvider } from '@/context/CountContext';
import { UseFavoritesProvider } from '@/context/FavoritesContext';
import HomeContent from '@/app/page';
import Searcher from '@/components/layout/searcher';
import Grid from '@/components/layout/grid';

// Mock de fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ favorites: [] }),
  })
) as jest.Mock;

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    alt = '',
    src,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    priority,
    ...props
  }: {
    alt?: string;
    src: string;
    priority?: boolean;
  }) => {
    // Omitimos priority del spread para evitar la advertencia
    return <img alt={alt} src={src} {...props} />;
  },
}));

// Mock del módulo getCharacters
jest.mock('@/api/getCharacters', () => ({
  getCharacters: jest.fn(),
}));

const mockCharacters = [
  {
    id: '1',
    name: 'Spider-Man',
    description: 'Your friendly neighborhood Spider-Man',
    thumbnail: {
      path: 'http://example.com/spiderman',
      extension: 'jpg',
    },
    comics: { available: 1, items: [] },
    series: { available: 1, items: [] },
    stories: { available: 1, items: [] },
    events: { available: 0, items: [] },
    urls: [],
    modified: '',
    resourceURI: '',
    createdAt: '2024-01-01',
    likesCount: 0,
    user: {
      id: '1',
      name: 'Test User',
      username: 'testuser',
      avatarUrl: 'http://example.com/avatar.jpg',
    },
    comments: [],
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    name: 'Iron Man',
    description: 'Genius billionaire playboy philanthropist',
    thumbnail: {
      path: 'http://example.com/ironman',
      extension: 'jpg',
    },
    comics: { available: 1, items: [] },
    series: { available: 1, items: [] },
    stories: { available: 1, items: [] },
    events: { available: 0, items: [] },
    urls: [],
    modified: '',
    resourceURI: '',
    createdAt: '2024-01-01',
    likesCount: 0,
    user: {
      id: '1',
      name: 'Test User',
      username: 'testuser',
      avatarUrl: 'http://example.com/avatar.jpg',
    },
    comments: [],
    isLiked: false,
    isSaved: false,
  },
];

const renderWithProviders = async (component: React.ReactNode) => {
  let rendered;
  await act(async () => {
    rendered = render(
      <UseFavoritesProvider>
        <UseCountProvider>{component}</UseCountProvider>
      </UseFavoritesProvider>
    );
  });
  return rendered;
};

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCharacters as jest.Mock).mockResolvedValue(mockCharacters);
  });

  describe('Searcher Component', () => {
    it('muestra el campo de búsqueda y el contador', async () => {
      await renderWithProviders(
        <>
          <Searcher />
          <Grid characters={mockCharacters} />
        </>
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Search a character...')
        ).toBeInTheDocument();
        expect(screen.getByText('2 results')).toBeInTheDocument();
      });
    });

    it('actualiza el valor del input al escribir', async () => {
      await renderWithProviders(<Searcher />);
      const input = screen.getByPlaceholderText(
        'Search a character...'
      ) as HTMLInputElement;

      await act(async () => {
        fireEvent.change(input, { target: { value: 'Spider' } });
      });

      expect(input.value).toBe('Spider');
    });
  });

  describe('Grid Component', () => {
    it('renderiza la lista de personajes', async () => {
      await renderWithProviders(
        <>
          <Searcher />
          <Grid characters={mockCharacters} />
        </>
      );

      await waitFor(() => {
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
        expect(screen.getByText('Iron Man')).toBeInTheDocument();
        expect(screen.getByText('2 results')).toBeInTheDocument();
      });
    });
  });

  describe('HomeContent', () => {
    it('carga y muestra los personajes', async () => {
      await renderWithProviders(await HomeContent());

      await waitFor(() => {
        expect(getCharacters).toHaveBeenCalledWith({ limit: 50 });
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
        expect(screen.getByText('Iron Man')).toBeInTheDocument();
      });
    });
  });
});

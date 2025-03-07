/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { getCharacterById } from '@/api/getCharacters';
import { UseFavoritesContext } from '@/context/FavoritesContext';
import { UseCountProvider } from '@/context/CountContext';
import FavoritesPage from '../favorites/page';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

// Mock del módulo getCharacters
jest.mock('@/api/getCharacters');

// Mock del contexto de favoritos con todas las funciones necesarias
jest.mock('@/context/FavoritesContext', () => ({
  UseFavoritesContext: jest.fn(),
}));

const mockCharacter = {
  id: '1',
  name: 'Iron Man',
  description: 'Genius billionaire',
  thumbnail: {
    path: 'http://example.com/ironman',
    extension: 'jpg',
  },
};

const createMockFavoritesContext = (favorites: string[] = []) => ({
  favorites,
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
  isFavorite: jest.fn(() => favorites.length > 0),
  toggleFavorite: jest.fn(),
});

const renderWithProviders = (component: React.ReactNode) => {
  return render(<UseCountProvider>{component}</UseCountProvider>);
};

describe('FavoritesPage', () => {
  const originalError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el estado de carga inicial', async () => {
    (UseFavoritesContext as jest.Mock).mockReturnValue(
      createMockFavoritesContext(['1'])
    );

    (getCharacterById as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    renderWithProviders(<FavoritesPage />);
    expect(await screen.findByText('Loading favorites...')).toBeInTheDocument();
  });

  it('muestra mensaje cuando no hay favoritos', async () => {
    (UseFavoritesContext as jest.Mock).mockReturnValue(
      createMockFavoritesContext([])
    );

    renderWithProviders(<FavoritesPage />);

    await waitFor(() => {
      expect(
        screen.getByText("You don't have any favorite characters")
      ).toBeInTheDocument();
    });
  });

  it('muestra los personajes favoritos', async () => {
    (UseFavoritesContext as jest.Mock).mockReturnValue(
      createMockFavoritesContext(['1'])
    );

    (getCharacterById as jest.Mock).mockResolvedValue([mockCharacter]);

    renderWithProviders(<FavoritesPage />);

    await waitFor(
      () => {
        expect(screen.getByText('Iron Man')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('maneja errores al cargar favoritos', async () => {
    (UseFavoritesContext as jest.Mock).mockReturnValue(
      createMockFavoritesContext(['1'])
    );

    (getCharacterById as jest.Mock).mockRejectedValue(
      new Error('Error loading favorites')
    );

    renderWithProviders(<FavoritesPage />);

    await waitFor(() => {
      expect(
        screen.getByText("You don't have any favorite characters")
      ).toBeInTheDocument();
    });
  });
});

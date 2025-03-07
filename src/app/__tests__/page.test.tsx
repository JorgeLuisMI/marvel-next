import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import SearchPage from '../search/page';
import { getCharacters } from '@/api/getCharacters';
import { UseCountProvider } from '@/context/CountContext';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => 'test-query',
  }),
}));

// Mock del módulo getCharacters
jest.mock('@/api/getCharacters');

const renderWithProvider = (component: React.ReactNode) => {
  return render(<UseCountProvider>{component}</UseCountProvider>);
};

describe('SearchPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el estado de carga inicial', async () => {
    (getCharacters as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    renderWithProvider(<SearchPage />);

    // Debería mostrar el estado de carga
    expect(
      await screen.findByText('Loading characters...')
    ).toBeInTheDocument();
  });

  it('muestra el contenido cuando termina de cargar', async () => {
    (getCharacters as jest.Mock).mockResolvedValue([]);
    renderWithProvider(<SearchPage />);

    await waitFor(() => {
      expect(
        screen.queryByText('Loading characters...')
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByPlaceholderText('Search a character...')
    ).toBeInTheDocument();
  });

  it('maneja errores en la búsqueda', async () => {
    console.error = jest.fn(); // Silenciar el error esperado
    (getCharacters as jest.Mock).mockRejectedValue(
      new Error('Error de búsqueda')
    );

    renderWithProvider(<SearchPage />);

    await waitFor(
      () => {
        expect(
          screen.queryByText('Loading characters...')
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText('0 results')).toBeInTheDocument();
  });
});

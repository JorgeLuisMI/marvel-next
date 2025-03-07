import '@testing-library/jest-dom';

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Configuración de React para usar la transformación JSX moderna
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  createElement: jest.requireActual('react').createElement,
  Fragment: jest.requireActual('react').Fragment,
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
})); 
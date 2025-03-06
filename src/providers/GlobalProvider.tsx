import { UseFavoritesProvider } from '@/context/FavoritesContext';
import { UseCountProvider } from '@/context/CountContext';

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UseFavoritesProvider>
      <UseCountProvider>{children}</UseCountProvider>
    </UseFavoritesProvider>
  );
}

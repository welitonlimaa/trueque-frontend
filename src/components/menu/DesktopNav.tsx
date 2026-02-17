import { Link } from 'react-router-dom';

type Props = {
  token: string | null;
  onLogout: () => void;
};

export default function DesktopNav({ token, onLogout }: Props) {
  return (
    <nav className="flex items-center gap-4 text-sm">
      <Link to="/listings" className="hover:text-green-600">
        Anúncios
      </Link>

      {token && (
        <>
          <Link
            to="/listings/new"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Anunciar
          </Link>

          <Link
            to="/listings/my"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Meus Anúncios
          </Link>
        </>
      )}

      {!token ? (
        <>
          <Link to="/login" className="hover:text-green-600">
            Entrar
          </Link>
          <Link
            to="/register"
            className="border px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Criar conta
          </Link>
        </>
      ) : (
        <button
          onClick={onLogout}
          className="text-gray-500 hover:text-red-500"
        >
          Sair
        </button>
      )}
    </nav>
  );
}
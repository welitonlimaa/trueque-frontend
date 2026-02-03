import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-600">
          Trueque
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/listings" className="hover:text-green-600">
            Anúncios
          </Link>

          {token && (
            <Link
              to="/listings/new"
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
            >
              Anunciar
            </Link>
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
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-500"
            >
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
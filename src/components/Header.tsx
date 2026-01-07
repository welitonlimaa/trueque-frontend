import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Home */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Trueque
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/listings" className="hover:text-blue-600">
            Anúncios
          </Link>

          {token && (
            <Link to="/listings/new" className="hover:text-blue-600">
              Criar anúncio
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
              >
                Cadastro
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600"
            >
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

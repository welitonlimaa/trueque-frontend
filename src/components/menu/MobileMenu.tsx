import { Link } from 'react-router-dom';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  token: string | null;
  onLogout: () => void;
};

export default function MobileMenu({
  open,
  setOpen,
  token,
  onLogout,
}: Props) {
  return (
    <>
      {/* Botão hamburguer */}
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl"
      >
        ☰
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col gap-4">
            
            <button
              onClick={() => setOpen(false)}
              className="self-end text-xl"
            >
              ✕
            </button>

            <Link to="/listings" onClick={() => setOpen(false)}>
              Anúncios
            </Link>

            {token && (
              <>
                <Link
                  to="/listings/new"
                  onClick={() => setOpen(false)}
                >
                  Anunciar
                </Link>

                <Link
                  to="/listings/my"
                  onClick={() => setOpen(false)}
                >
                  Meus Anúncios
                </Link>
              </>
            )}

            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                >
                  Entrar
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                >
                  Criar conta
                </Link>
              </>
            ) : (
              <button
                onClick={onLogout}
                className="text-left text-red-500"
              >
                Sair
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
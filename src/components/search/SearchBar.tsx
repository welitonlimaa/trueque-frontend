import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lupaIcon from '../../image/lupa.svg';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch() {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="w-full flex justify-center mt-6 mb-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-green-500">

          {/* Input */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar itens..."
            className="flex-1 bg-transparent outline-none text-sm px-2 py-2 placeholder-gray-400"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />

          {/* Botão */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 transition-colors text-white w-10 h-10 rounded-full"
          >
            <span className="text-sm">
                <img src={lupaIcon} alt="lupa de pesquisa" className="w-6 h-6" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchListings } from '../api/listings';
import ListingGrid from '../components/Listing/ListingGrid';
import { ListingResponseDTO } from '../types/api';

export default function SearchListings() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const query = params.get('q') || '';

  const [listings, setListings] = useState<ListingResponseDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    let isMounted = true;

    async function fetchData() {
        try {
        setLoading(true);

        const res = await searchListings({ query, page, size: 10 });

        if (!isMounted) return;

        setListings(res.content);
        setTotalPages(res.totalPages);
        } catch (e) {
        console.error(e);
        } finally {
        if (isMounted) {
            setLoading(false);
        }
        }
    }

    fetchData();

    return () => {
        isMounted = false;
    };
    }, [query, page]);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-semibold">
        Resultados para: "{query}"
      </h1>

      {loading && <p className="text-sm text-gray-500">Carregando...</p>}

      {!loading && listings.length === 0 && (
        <p className="text-sm text-gray-500">
          Nenhum resultado encontrado.
        </p>
      )}

      <ListingGrid
        items={listings}
        renderFooter={(listing) => (
          <button
            onClick={() => navigate(`/listings/${listing.id}`)}
            className="mt-3 text-sm text-green-600"
          >
            Ver detalhes
          </button>
        )}
      />

      {/* 🔥 PAGINAÇÃO */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page === 0}
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ←
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`px-3 py-1 border rounded ${
                i === page ? 'bg-green-600 text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages - 1}
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
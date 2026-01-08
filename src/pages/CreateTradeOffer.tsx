import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById, getMyListings } from '../api/listings';
import { createTradeOffer } from '../api/tradeoffers';
import { ListingResponseDTO } from '../types/api';
import ListingCard from '../components/ListingCard';

export default function CreateTradeOffer() {
  const requestedListingId = useParams().requestedListingId ?? '';
  const navigate = useNavigate();

  const [requestedListing, setRequestedListing] =
    useState<ListingResponseDTO | null>(null);
  const [myListings, setMyListings] = useState<ListingResponseDTO[]>([]);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!requestedListingId) return;

    async function loadData() {
      try {
        const [requested, mine] = await Promise.all([
          getListingById(requestedListingId),
          getMyListings(),
        ]);

        setRequestedListing(requested);
        setMyListings(mine);
      } catch {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [requestedListingId]);

  async function handleSubmit() {
        if (!selectedListingId) {
            setError('Selecione um item para oferecer');
            return;
        }

        await createTradeOffer({
            offeredListingId: selectedListingId,
            requestedListingId,
        });

        navigate('/listings');
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!requestedListingId) {
    setError('Rota inválida');
    return;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Criar proposta de troca</h1>

      {/* ITEM DESEJADO */}
      <section>
        <h2 className="font-semibold mb-2">Item desejado</h2>
        {requestedListing && <ListingCard listing={requestedListing} />}
      </section>

      {/* SEUS ITENS */}
      <section>
        <h2 className="font-semibold mb-4">Escolha um item para oferecer</h2>

        {myListings.length === 0 ? (
          <p>Você ainda não possui anúncios.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myListings.map((listing) => (
              <button
                key={listing.id}
                onClick={() => setSelectedListingId(listing.id)}
                className={`border rounded p-4 text-left ${
                  selectedListingId === listing.id
                    ? 'border-blue-600 bg-blue-50'
                    : ''
                }`}
              >
                <ListingCard listing={listing} />
              </button>
            ))}
          </div>
        )}
      </section>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Enviar proposta
      </button>
    </div>
  );
}
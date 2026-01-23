import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById, getMyListings } from '../api/listings';
import { createTradeOffer } from '../api/tradeoffers';
import { ListingResponseDTO } from '../types/api';
import { ListingCardMedia } from '../components/Listing/ListingCardMedia';
import { ListingCardInfo } from '../components/Listing/ListingCardInfo';
import ListingGrid from '../components/Listing/ListingGrid';
import ListingCard from '../components/Listing/ListingCard';
import Button from '../components/ui/Button';

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

      <section>
        <h2 className="font-semibold mb-2">Item desejado</h2>

        {requestedListing && (
          <ListingCard>
            <ListingCardMedia
              image={requestedListing.images?.[0]}
              title={requestedListing.title}
            />
            <ListingCardInfo listing={requestedListing} />
          </ListingCard>
        )}
      </section>

      {/* SEUS ITENS */}
      <section>
        <h2 className="font-semibold mb-4">Escolha um item para oferecer</h2>

        <ListingGrid
          items={myListings}
          selectedId={selectedListingId}
          onSelect={setSelectedListingId}
        />
      </section>

      <Button size="lg" onClick={handleSubmit}>
        Enviar proposta
      </Button>
    </div>
  );
}
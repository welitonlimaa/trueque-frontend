import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTradeOffersWithListings } from '../api/tradeoffers';
import { TradeOfferWithListings } from '../types/api';
import TradeOfferCard from '../components/TradeOfferCard';

export default function ListingTradeOffers() {
  const { id } = useParams<{ id: string }>();
  const [offers, setOffers] = useState<TradeOfferWithListings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getTradeOffersWithListings(id)
      .then(setOffers)
      .catch(() => setError('Erro ao carregar propostas'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando propostas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Propostas de troca
      </h1>

      {offers.length === 0 ? (
        <p>Nenhuma proposta recebida ainda.</p>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => (
            <TradeOfferCard
              key={offer.id}
              offer={offer}
              listingId={id!}
            />
          ))}
        </div>
      )}
    </div>
  );
}

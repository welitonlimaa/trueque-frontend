import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getListingById } from '../api/listings';
import { ListingResponseDTO } from '../types/api';
import { getCurrentUser } from '../utils/getCurrentUser';


export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<ListingResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentUser = getCurrentUser();

  useEffect(() => {
        if (!id) return;

        const fetchListing = async () => {
            try {
            setLoading(true);
            const data = await getListingById(id);
            setListing(data);
            } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar anúncio');
            } finally {
            setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!listing) return <p>Anúncio não encontrado</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <p className="text-gray-600 mb-2">{listing.category} • {listing.condition}</p>
      <p className="text-gray-500 mb-4">{listing.city} - {listing.state}</p>

      {listing.images && listing.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {listing.images.map((url, idx) => (
            <img key={idx} src={url} alt={`${listing.title} ${idx + 1}`} className="w-full h-48 object-cover rounded" />
          ))}
        </div>
      )}

      <p className="mb-4">{listing.description}</p>

      <div className="text-gray-400 text-sm">Criado em: {new Date(listing.createdAt).toLocaleDateString()}</div>
      <div className="text-gray-400 text-sm">Criado por: {listing.user.name}</div>
      {listing?.user?.id === currentUser?.userId && (
        <Link
          to={`/listings/${listing.id}/trade-offers`}
          className="inline-flex mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Ver propostas recebidas
        </Link>
      )}

      <button
        onClick={() => navigate(`/trade-offers/new/${listing.id}`)}
        className="text-sm text-blue-600 hover:underline"
      >
        Fazer proposta
      </button>

    </div>
  );
}

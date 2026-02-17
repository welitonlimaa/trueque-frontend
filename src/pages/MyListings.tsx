import { useEffect, useState } from 'react';
import { getMyListings } from '../api/listings';
import { useNavigate } from 'react-router-dom';
import ListingGrid from '../components/Listing/ListingGrid';
import { ListingResponseDTO } from '../types/api';
import { getCurrentUser } from '../utils/getCurrentUser';

export default function MyListings() {
  const [listings, setListings] = useState<ListingResponseDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUserData = getCurrentUser();

    if (!currentUserData) {
        navigate('/login');
        return;
    }

    getMyListings().then(setListings);

    }, [navigate]);


  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Mais procurados
      </h1>

      <ListingGrid
        items={listings}
        renderFooter={(listing) => (
          <button
            onClick={() => navigate(`/listings/${listing.id}`)}
            className="mt-2 text-sm text-green-600 hover:underline"
          >
            Ver detalhes
          </button>
        )}
      />
    </>
  );
}

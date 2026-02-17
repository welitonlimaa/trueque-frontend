import { useEffect, useState } from 'react';
import { getAllListings } from '../api/listings';
import { useNavigate } from 'react-router-dom';
import ListingGrid from '../components/Listing/ListingGrid';
import { ListingResponseDTO } from '../types/api';

export default function Home() {
  const [listings, setListings] = useState<ListingResponseDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllListings().then(setListings);
  }, []);

  console.log(listings)

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

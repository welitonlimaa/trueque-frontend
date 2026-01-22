import { useEffect, useState } from 'react';
import { getAllListings } from '../api/listings';
import { useNavigate } from 'react-router-dom';
import ListingGrid from '../components/Listing/ListingGrid';
import { ListingResponseDTO } from '../types/api';

export default function ListingsList() {
  const [listings, setListings] = useState<ListingResponseDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllListings().then(setListings);
  }, []);

  return (
    <div className="p-6">
      <ListingGrid
        items={listings}
        renderFooter={(listing) => (
          <button
            onClick={() => navigate(`/listings/${listing.id}`)}
            className="mt-3 text-sm text-blue-600"
          >
            Ver detalhes
          </button>
        )}
      />
    </div>
  );
}
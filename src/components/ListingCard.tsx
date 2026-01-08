import { ListingResponseDTO } from '../types/api';

export default function ListingCard({
  listing,
}: {
  listing: ListingResponseDTO;
}) {
  return (
    <div className="flex gap-4">
      {listing.images?.[0] && (
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-24 h-24 object-cover rounded"
        />
      )}

      <div>
        <h3 className="font-semibold">{listing.title}</h3>
        <p className="text-sm text-gray-600">
          {listing.category} • {listing.condition}
        </p>
        <p className="text-sm text-gray-500">
          {listing.city} - {listing.state}
        </p>
      </div>
    </div>
  );
}

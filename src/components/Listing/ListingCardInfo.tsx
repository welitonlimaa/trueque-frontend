import { ListingResponseDTO } from '../../types/api';

type Props = {
  listing: ListingResponseDTO;
};

export function ListingCardInfo({ listing }: Props) {
  return (
    <div>
      <h3 className="font-semibold">{listing.title}</h3>

      <p className="text-sm text-gray-600">
        {listing.category} • {listing.condition}
      </p>

      <p className="text-sm text-gray-500">
        {listing.city} - {listing.state}
      </p>
    </div>
  );
}
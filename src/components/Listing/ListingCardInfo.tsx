import { ListingResponseDTO } from '../../types/api';

type Props = {
  listing: ListingResponseDTO;
};

export function ListingCardInfo({ listing }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
        {listing.title}
      </h3>

      <p className="text-xs text-gray-600">
        {listing.category} • {listing.condition}
      </p>

      <p className="text-xs text-gray-500">
        {listing.city} - {listing.state}
      </p>
    </div>
  );
}
import { TradeOfferResponseDTO } from '../types/api';

type Props = {
  offer: TradeOfferResponseDTO;
  listingId: string;
};

export default function TradeOfferCard({ offer, listingId }: Props) {
  const isReceiving = offer.requestedListingId === listingId;

  const myListing = isReceiving
    ? offer.requestedListing
    : offer.offeredListing;

  const otherListing = isReceiving
    ? offer.offeredListing
    : offer.requestedListing;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between mb-3">
        <span className="font-semibold">
          {isReceiving ? '📥 Proposta recebida' : '📤 Proposta enviada'}
        </span>

        <span className="text-sm px-2 py-1 rounded bg-gray-100">
          {offer.status}
        </span>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-2 gap-4">
        {/* Meu item */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Seu item</p>
          <img
            src={myListing.images?.[0]}
            alt={myListing.title}
            className="h-32 w-full object-cover rounded mb-1"
          />
          <p className="font-medium">{myListing.title}</p>
        </div>

        {/* Outro item */}
        <div>
          <p className="text-xs text-gray-500 mb-1">
            {isReceiving ? 'Item oferecido' : 'Item solicitado'}
          </p>
          <img
            src={otherListing.images?.[0]}
            alt={otherListing.title}
            className="h-32 w-full object-cover rounded mb-1"
          />
          <p className="font-medium">{otherListing.title}</p>
        </div>
      </div>
    </div>
  );
}

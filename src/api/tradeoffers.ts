import client from './client';
import type { TradeOfferResponseDTO, TradeOfferWithListings, ListingResponseDTO, TradeOfferRequestDTO } from '../types/api';
import { getListingById } from './listings';

export async function getTradeOffersByListingId(listingId: string) {
  const res = await client.get<TradeOfferResponseDTO[]>(
    `/tradeoffers/listing/${listingId}/offers`
  );
  return res.data;
}

export async function getTradeOffersWithListings(
  listingId: string
): Promise<TradeOfferWithListings[]> {
  const offers = await getTradeOffersByListingId(listingId);

  const listingIds = Array.from(
    new Set(
      offers.flatMap(o => [o.offeredListingId, o.requestedListingId])
    )
  );

  const listingsMap = new Map<string, ListingResponseDTO>();

  await Promise.all(
    listingIds.map(async id => {
      const listing = await getListingById(id);
      listingsMap.set(id, listing);
    })
  );

  return offers.map(offer => ({
    ...offer,
    offeredListing: listingsMap.get(offer.offeredListingId)!,
    requestedListing: listingsMap.get(offer.requestedListingId)!,
  }));
}

export async function createTradeOffer(
  data: TradeOfferRequestDTO
) {
  const res = await client.post('/tradeoffers', data);
  return res.data;
}
export type LoginRequestDTO = { email: string; password: string };

export type AuthResponseDTO = { email: string; name: string; token: string };

export type UserSummaryDTO = {
    id: string;
    name: string;
    profilePicture?: string;
};
  
export type ListingResponseDTO = {
    id: string;
    title: string;
    description?: string;
    category?: string;
    condition?: string;
    images?: string[];
    city?: string;
    state?: string;
    status?: string;
    createdAt?: string;
    user?: UserSummaryDTO;
};

export type ListingRequestDTO = {
  title: string;
  description?: string;
  category?: string;
  condition?: string;
  city?: string;
  state?: string;
  images?: string[];
};

export interface UserDataRequestDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    state: string;
    profilePicture?: string;
    googleId?: string;
};

export type TradeOfferResponseDTO = {
  id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  acceptedAt?: string;
  rejectedAt?: string;

  offeredListingId: string;
  requestedListingId: string;
};

export type TradeOfferWithListings = TradeOfferResponseDTO & {
  offeredListing: ListingResponseDTO;
  requestedListing: ListingResponseDTO;
};

export interface AiListingRequestDTO {
  imageBase64: string;
}
export interface AiListingResponseDTO {
  title: string;
  description: string;
  category: string;
  condition: string;
}

export type TradeOfferRequestDTO = {
  offeredListingId: string;
  requestedListingId: string;
};

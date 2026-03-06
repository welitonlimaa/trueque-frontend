import client from './client';
import authClient from './authClient';
import type { AiListingResponseDTO, ListingRequestDTO, ListingResponseDTO } from '../types/api';
import { getCurrentUser } from '../utils/getCurrentUser';


export async function getAllListings() {
const res = await client.get<ListingResponseDTO[]>('/listings/');
return res.data;
}

export async function getMyListings(status?: string) {
  const res = await authClient.get<ListingResponseDTO[]>('/listings/my', {
    params: status ? { status } : undefined,
  });

  return res.data;
}

export async function getListingById(id: string) {
  const jwt = getCurrentUser()

  if (jwt) {
    const res = await authClient.get<ListingResponseDTO>(`/listings/${id}`);
    return res.data;
  }

  const res = await client.get<ListingResponseDTO>(`/listings/${id}`);
  return res.data;
}


export async function createListing(data: ListingRequestDTO) {
const res = await authClient.post<ListingResponseDTO>('/listings/createlisting', data);
return res.data;
}


export async function deleteListing(id: string) {
const res = await authClient.delete<void>(`/listings/${id}`);
return res.data;
}

export async function autofillListingWithAi(
  imageBase64: string
): Promise<AiListingResponseDTO> {
  if (!imageBase64) {
    throw new Error('Imagem não informada');
  }

  const res = await authClient.post<AiListingResponseDTO>(
    '/ai/listings/autofill',
    { imageBase64 }
  );

  return res.data;
}

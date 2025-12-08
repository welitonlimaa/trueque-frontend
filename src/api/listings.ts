import client from './client';
import type { ListingRequestDTO, ListingResponseDTO } from '../types/api';


export async function getAllListings() {
const res = await client.get<ListingResponseDTO[]>('/listings/');
return res.data;
}


export async function getListingById(id: string) {
const res = await client.get<ListingResponseDTO>(`/listings/${id}`);
return res.data;
}


export async function createListing(data: ListingRequestDTO) {
const res = await client.post<ListingResponseDTO>('/listings/createlisting', data);
return res.data;
}


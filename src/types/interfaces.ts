import { ListingResponseDTO } from "./api";

export interface SearchListingsParams {
  query: string;
  page?: number;
  size?: number;
}

export interface SearchListingsResponse {
  content: ListingResponseDTO[];
  totalPages: number;
  totalElements: number;
  number: number;
}
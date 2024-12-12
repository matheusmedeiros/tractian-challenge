// src/api.ts
import { Company, Location, Asset } from './types/api';

const API_URL = 'https://fake-api.tractian.com';

async function fetchAPI<T = unknown>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error('Network fail');
  }

  return response.json();
}

export function fetchCompanies() {
  return fetchAPI<Company[]>('/companies');
}

export function fetchLocations(companyId: string) {
  return fetchAPI<Location[]>(`/companies/${companyId}/locations`);
}

export function fetchAssets(companyId: string) {
  return fetchAPI<Asset[]>(`/companies/${companyId}/assets`);
}

import { useQuery } from '@tanstack/react-query';
import { fetchCompanies, fetchLocations, fetchAssets } from '../api';

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies
  });
};

export const useCompanyLocations = (companyId?: string) => {
  return useQuery({
    queryKey: ['locations', companyId],
    queryFn: () => fetchLocations(companyId!),
    enabled: !!companyId
  });
};

export const useCompanyAssets = (companyId?: string) => {
  return useQuery({
    queryKey: ['assets', companyId],
    queryFn: () => fetchAssets(companyId!),
    enabled: !!companyId
  });
};
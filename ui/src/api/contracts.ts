import { getRequest } from './helpers';

export function getContract(id: string, profileId: string): Promise<any> {
  return getRequest(`/contracts/${id}`, profileId);
}

export function getContracts(limit: number, offset: number, profileId: string): Promise<any> {
  return getRequest(`/contracts?limit=${limit}&offset=${offset}`, profileId);
}

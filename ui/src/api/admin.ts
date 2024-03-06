import { getRequest } from './helpers';

export async function getBestProfession(startDate: Date, endDate: Date, profileId: string): Promise<any> {
  return getRequest(`/admin/best-profession?start=${startDate}&end=${endDate}`, profileId);
}

export function getBestClients(startDate: Date, endDate: Date, limit: number, profileId: string): Promise<any> {
  return getRequest(`admin/best-clients?start=${startDate}&end=${endDate}&limit=${limit}`, profileId);
}

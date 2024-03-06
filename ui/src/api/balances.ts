import { postRequest } from './helpers';

export function deposit(amount: number, userId: string, profileId: string): Promise<any> {
  return postRequest(`/balances/deposit/${userId}`, { amount }, profileId);
}

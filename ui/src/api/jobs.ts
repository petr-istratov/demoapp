import { getRequest, postRequest } from './helpers';

export function getUnpaidJobs(limit: number, offset: number, profileId: string): Promise<any> {
  return getRequest(`/jobs/unpaid?limit=${limit}&offset=${offset}`, profileId);
}

export function payForJob(id: string, profileId: string): Promise<any> {
  return postRequest(`/jobs/${id}/pay`, {}, profileId);
}

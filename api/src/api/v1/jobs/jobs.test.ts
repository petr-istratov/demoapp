import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { Job } from '../../../models/Job';
import { Profile } from '../../../models/Profile';
import finish from '../../../tests/finish';
import { createContract, destroyContract } from '../../../tests/mocks/Contract';
import { createJob, destroyJob } from '../../../tests/mocks/Job';
import { createProfile, destroyProfile } from '../../../tests/mocks/Profile';
import start from '../../../tests/start';
import { JobsController } from './router';

describe('Jobs test', () => {
  let server;
  const clientId = uuidv4();
  const contractorId = uuidv4();
  const contractId = uuidv4();
  const jobId1 = uuidv4();
  const jobId2 = uuidv4();
  const jobId3 = uuidv4();

  beforeAll(async () => {
    server = await start([JobsController]);
    await createProfile({ id: clientId, balance: 1000, type: 'CLIENT' });
    await createProfile({ id: contractorId, balance: 1000, type: 'CONTRACTOR' });
    await createContract({ id: contractId, clientId, contractorId });
    await createJob({ id: jobId1, contractId, price: 200 });
    await createJob({ id: jobId2, contractId });
    await createJob({ id: jobId3, contractId });
  });

  afterAll(async () => {
    await destroyJob({ id: jobId1 });
    await destroyJob({ id: jobId2 });
    await destroyJob({ id: jobId3 });
    await destroyContract({ id: contractId });
    await destroyProfile({ id: contractorId });
    await destroyProfile({ id: clientId });
    await finish();
  });

  test('It should return auth error', async () => {
    const response = await request(server).get(`/api/v1/jobs/unpaid`);
    expect(response.statusCode).toBe(403);
  });

  test('Unpaid jobs without params', async () => {
    const response = await request(server).get('/api/v1/jobs/unpaid').set({ profile_id: clientId });
    expect(response.statusCode).toBe(400);
  });

  test('Unpaid jobs', async () => {
    const response = await request(server).get('/api/v1/jobs/unpaid?limit=5').set({ profile_id: clientId });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0].contractId).toBe(contractId);
  });

  test('It should return auth error', async () => {
    const response = await request(server).post(`/api/v1/jobs/${jobId1}/pay`);
    expect(response.statusCode).toBe(403);
  });

  test('Pay for job', async () => {
    const response = await request(server).post(`/api/v1/jobs/${jobId1}/pay`).set({ profile_id: clientId });
    expect(response.statusCode).toBe(200);

    const client = await Profile.findOne({ where: { id: clientId } });
    expect(client.balance).toBe(800);

    const contractor = await Profile.findOne({ where: { id: contractorId } });
    expect(contractor.balance).toBe(1200);

    const job = await Job.findOne({ where: { id: jobId1 } });
    expect(job.paid).toBe(true);
  });
});

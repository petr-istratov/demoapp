import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { Profile } from '../../../models/Profile';
import finish from '../../../tests/finish';
import { createContract, destroyContract } from '../../../tests/mocks/Contract';
import { createJob, destroyJob } from '../../../tests/mocks/Job';
import { createProfile, destroyProfile } from '../../../tests/mocks/Profile';
import start from '../../../tests/start';
import { BalancesController } from './router';

describe('Balances test', () => {
  let server;
  const clientId = uuidv4();
  const contractorId = uuidv4();
  const contractId = uuidv4();
  const jobId = uuidv4();

  beforeAll(async () => {
    server = await start([BalancesController]);
    await createProfile({ id: clientId, balance: 1000, type: 'CLIENT' });
    await createProfile({ id: contractorId, balance: 1000, type: 'CONTRACTOR' });
    await createContract({ id: contractId, clientId, contractorId });
    await createJob({ id: jobId, contractId, price: 1000 });
  });

  afterAll(async () => {
    await destroyJob({ id: jobId });
    await destroyContract({ id: contractId });
    await destroyProfile({ id: contractorId });
    await destroyProfile({ id: clientId });
    await finish();
  });

  test('It should return auth error', async () => {
    const response = await request(server).post(`/api/v1/balances/deposit/${clientId}`);
    expect(response.statusCode).toBe(403);
  });

  test('Deposit without params', async () => {
    const response = await request(server).post(`/api/v1/balances/deposit/${clientId}`).set({ profile_id: clientId });
    expect(response.statusCode).toBe(400);
  });

  test('Deposit exceeds maximum', async () => {
    const response = await request(server)
      .post(`/api/v1/balances/deposit/${clientId}`)
      .send({ amount: 500 })
      .set({ profile_id: clientId });

    expect(response.statusCode).toBe(200);
    expect(response.body.httpCode).toBe(403);
  });

  test('Deposit', async () => {
    const response = await request(server)
      .post(`/api/v1/balances/deposit/${clientId}`)
      .send({ amount: 200 })
      .set({ profile_id: clientId });

    expect(response.statusCode).toBe(200);
    const res = await Profile.findOne({ where: { id: clientId } });
    expect(res.balance).toBe(1200);
  });
});

import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import finish from '../../../tests/finish';
import { createContract, destroyContract } from '../../../tests/mocks/Contract';
import { createProfile, destroyProfile } from '../../../tests/mocks/Profile';
import start from '../../../tests/start';
import { ContractsController } from './router';

describe('Contracts test', () => {
  let server;
  const clientId = uuidv4();
  const contractorId = uuidv4();
  const contractId1 = uuidv4();
  const contractId2 = uuidv4();
  const contractId3 = uuidv4();

  beforeAll(async () => {
    server = await start([ContractsController]);
    await createProfile({ id: clientId, balance: 1000, type: 'CLIENT' });
    await createProfile({ id: contractorId, balance: 1000, type: 'CONTRACTOR' });
    await createContract({ id: contractId1, clientId, contractorId });
    await createContract({ id: contractId2, clientId, contractorId });
    await createContract({ id: contractId3, clientId, contractorId });
  });

  afterAll(async () => {
    await destroyContract({ id: contractId1 });
    await destroyContract({ id: contractId2 });
    await destroyContract({ id: contractId3 });
    await destroyProfile({ id: contractorId });
    await destroyProfile({ id: clientId });
    await finish();
  });

  test('It should return auth error', async () => {
    const response = await request(server).get(`/api/v1/contracts/${contractId1}`);
    expect(response.statusCode).toBe(403);
  });

  test('Contract', async () => {
    const response = await request(server).get(`/api/v1/contracts/${contractId1}`).set({ profile_id: clientId });
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body)).toStrictEqual([
      'id',
      'terms',
      'status',
      'contractorId',
      'clientId',
      'createdAt',
      'updatedAt',
    ]);
    expect(response.body.clientId).toBe(clientId);
  });

  test('It should return auth error', async () => {
    const response = await request(server).get('/api/v1/contracts');
    expect(response.statusCode).toBe(403);
  });

  test('Contracts without params', async () => {
    const response = await request(server).get('/api/v1/contracts').set({ profile_id: clientId });
    expect(response.statusCode).toBe(400);
  });

  test('Contracts', async () => {
    const response = await request(server).get('/api/v1/contracts?limit=5').set({ profile_id: clientId });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(Object.keys(response.body[0])).toStrictEqual([
      'id',
      'terms',
      'status',
      'contractorId',
      'clientId',
      'createdAt',
      'updatedAt',
    ]);
  });
});

import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import finish from '../../../tests/finish';
import { createProfile, destroyProfile } from '../../../tests/mocks/Profile';
import start from '../../../tests/start';
import { AdminController } from './router';

describe('Admin test', () => {
  let server;
  const profileId = uuidv4();

  beforeAll(async () => {
    server = await start([AdminController]);
    await createProfile({ id: profileId });
  });

  afterAll(async () => {
    await destroyProfile({ id: profileId });
    await finish();
  });

  test('It should return auth error', async () => {
    const response = await request(server).get('/api/v1/admin/best-profession');
    expect(response.statusCode).toBe(403);
  });

  test('Best profession without params', async () => {
    const response = await request(server).get('/api/v1/admin/best-profession').set({ profile_id: profileId });
    expect(response.statusCode).toBe(400);
  });

  test('Best profession', async () => {
    const response = await request(server)
      .get('/api/v1/admin/best-profession?start=2020-01-01&end=2024-01-01')
      .set({ profile_id: profileId });
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body)).toStrictEqual(['profession', 'paidTotal']);
    expect(typeof response.body.profession).toBe('string');
    expect(typeof response.body.paidTotal).toBe('number');
  });

  test('It should return auth error', async () => {
    const response = await request(server).get('/api/v1/admin/best-clients');
    expect(response.statusCode).toBe(403);
  });

  test('Best clients without params', async () => {
    const response = await request(server).get('/api/v1/admin/best-clients').set({ profile_id: profileId });
    expect(response.statusCode).toBe(400);
  });

  test('Best clients', async () => {
    const response = await request(server)
      .get('/api/v1/admin/best-clients?start=2020-01-01&end=2024-01-01')
      .set({ profile_id: profileId });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(Object.keys(response.body[0])).toStrictEqual(['id', 'fullName', 'paid']);
    expect(typeof response.body[0].id).toBe('string');
    expect(typeof response.body[0].fullName).toBe('string');
    expect(typeof response.body[0].paid).toBe('number');
  });
});

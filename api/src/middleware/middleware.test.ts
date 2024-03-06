import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { AppController } from '../api/v1/version/router';
import finish from '../tests/finish';
import { createProfile, destroyProfile } from '../tests/mocks/Profile';
import start from '../tests/start';

describe('Middleware test', () => {
  let server;
  const profileId = uuidv4();

  beforeAll(async () => {
    server = await start([AppController]);
    await createProfile({ id: profileId });
  });

  afterAll(async () => {
    await destroyProfile({ id: profileId });
    await finish();
  });

  test('It should return auth error', async () => {
    const response = await request(server).get('/api/v1');
    expect(response.statusCode).toBe(403);
  });

  test('It should response the GET method', async () => {
    const response = await request(server).get('/api/v1').set({ profile_id: profileId });
    expect(response.statusCode).toBe(200);
  });
});

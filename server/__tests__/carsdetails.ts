import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import buildDB from '../src/db/config/buildFakeData';
import sequelize from '../src/db/config/connection';

beforeAll(() => buildDB());
afterAll(() => sequelize.close());
describe('/cars/:id', () => {
  test('should return all cars details when there is no filter car', async () => {
    const result = await request(app).get('/api/v1/cars/2');
    expect(result.body.msg).toEqual('done!');
    expect(result.body.data[0].id).toEqual(2);
    expect(result.body.data[0].brand).toEqual('BMW');
  });
});

import {
  afterAll, beforeAll, describe, expect, test,
} from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import buildDB from '../src/db/config/buildFakeData';
import sequelize from '../src/db/config/connection';

beforeAll(() => buildDB());
afterAll(() => sequelize.close());
function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
describe('/cars endpoint', () => {
  test('should return all cars when there is no filters', async () => {
    const result = await request(app).get('/api/v1/cars');
    expect(result.body.data.count).toEqual(18);
    expect(result.body.data.rows.length).toEqual(9);
    expect(result.statusCode).toEqual(200);
  });

  test('should return all cars when there is no value to query string', async () => {
    const result = await request(app).get('/api/v1/cars?year=&model=&maxPrice=&mileage=&goodPrice=&fuel=');
    expect(result.body.data.count).toEqual(18);
    expect(result.statusCode).toEqual(200);
  });

  test('should return all cars made by Toyota', async () => {
    const result = await request(app).get('/api/v1/cars?brand=Toyota');
    expect(result.body.data.count).toEqual(1);
    expect(result.body.data.rows[0].brand).toEqual('Toyota');
    expect(result.statusCode).toEqual(200);
  });

  test('should return Cars model "Sport HSE 3.0L Supercharged V6" ', async () => {
    const result = await request(app).get('/api/v1/cars?model=Sport HSE 3.0L Supercharged V6');
    expect(result.body.data.count).toEqual(1);
    expect(result.body.data.rows[0].model).toEqual('Sport HSE 3.0L Supercharged V6');
    expect(result.statusCode).toEqual(200);
  });

  test('should return cars whose mileage is less than or equal to 48000', async () => {
    const result = await request(app).get('/api/v1/cars?mileage=48000');
    expect(result.body.data.count).toEqual(6);
    expect(result.body.data.rows[getRandomIndex(0, result.body.data.count)].mileage)
      .toBeLessThanOrEqual(48000);
    expect(result.statusCode).toEqual(200);
  });

  test('should return cars whose year model is 2015 ', async () => {
    const result = await request(app).get('/api/v1/cars?year=2015');
    expect(result.body.data.count).toEqual(3);
    expect(result.body.data.rows[getRandomIndex(0, result.body.data.count)].year)
      .toEqual(2015);
    expect(result.statusCode).toEqual(200);
  });

  test('should return cars whose fuel type is diesel', async () => {
    const result = await request(app).get('/api/v1/cars?fuel=diesel');
    expect(result.body.data.count).toEqual(2);
    expect(result.body.data.rows[getRandomIndex(0, result.body.data.count)].fuel)
      .toEqual('diesel');
    expect(result.statusCode).toEqual(200);
  });

  test('should return good price cars', async () => {
    const result = await request(app).get('/api/v1/cars?goodPrice=1');
    expect(result.body.data.count).toEqual(8);
    expect(result.body.data.rows[getRandomIndex(0, result.body.data.count)].isGoodPrice)
      .toEqual(true);
    expect(result.statusCode).toEqual(200);
  });

  test('should return all cars(good price or not) when goodPrice=0', async () => {
    const result = await request(app).get('/api/v1/cars?goodPrice=0');
    expect(result.body.data.count).toEqual(18);
    expect(result.statusCode).toEqual(200);
  });

  test('should return Not Found message when there is not matches', async () => {
    const result = await request(app).get('/api/v1/cars?brand=Lamborghini&year=2020');
    expect(result.body.data.rows).toEqual([]);
    expect(result.body.msg).toEqual('Not found');
    expect(result.statusCode).toEqual(200);
  });

  test('should return specific car', async () => {
    const result = await request(app).get('/api/v1/cars?brand=Lamborghini&year=2017&price=200000');
    expect(result.body.data.count).toEqual(1);
    expect(result.body.data.rows[0].brand).toEqual('Lamborghini');
    expect(result.body.data.rows[0].year).toEqual(2017);
    expect(result.body.data.rows[0].price).toBeLessThanOrEqual(200000);
    expect(result.statusCode).toEqual(200);
  });
  test('should return id of car that update', async () => {
    const result = await request(app).put('/api/v1/cars/1');
    expect(result.body.data[0]).toEqual(0);
    expect(result.body.msg).toEqual('done!');
    expect(result.statusCode).toEqual(200);
  });
});

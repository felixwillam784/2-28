import {
  afterAll, beforeAll, describe, expect, test,
} from '@jest/globals';
import request from 'supertest';
import { config } from 'dotenv';
import app from '../src/app';
import buildDB from '../src/db/config/buildFakeData';
import sequelize from '../src/db/config/connection';

config();
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
  test('should return cars details', async () => {
    const result = await request(app).get('/api/v1/cars/dashboard?state=pending&page=1')
      .set('Cookie', `token=${process.env.ADMIN_TOKEN}`);
    expect(result.body.data.count).toEqual(2);
    expect(result.body.data.rows.length).toEqual(2);
    expect(result.body.data.rows[0].id).toEqual(15);
  });
  test('should return cars details', async () => {
    const result = await request(app).get('/api/v1/cars/dashboard?state=on-market&page=1')
      .set('Cookie', `token=${process.env.ADMIN_TOKEN}`);
    expect(result.body.data.count).toEqual(14);
    expect(result.body.data.rows.length).toEqual(10);
    expect(result.body.data.rows[0].id).toEqual(1);
  });
  test('should return id of car that update', async () => {
    const result = await request(app).put('/api/v1/cars/1')
      .set('Cookie', `token=${process.env.ADMIN_TOKEN}`);
      
    expect(result.body.data[0]).toEqual(0);
    expect(result.body.msg).toEqual('done!');
    expect(result.statusCode).toEqual(200);
  });
  test('should return id of car that update', async () => {
    const result = await request(app).put('/api/v1/cars/1')
      .set('Cookie', '');
    expect(result.body).toEqual('Unauthorized');
    expect(result.statusCode).toEqual(401);
  });
  test('should return the data i update', async () => {
    const result = await request(app).put('/api/v1/cars/1')
      .set('Cookie', `token=${process.env.ADMIN_TOKEN}`)
      .send({ brand: 'husam' })
      .expect(200);
    expect(result.body.data[1][0].brand).toEqual('husam');
    expect(result.body.data[1][0].model).toEqual('Land Cruiser VXR 4.0L V6');
    expect(result.body.data[1][0].price).toEqual(48000);
    expect(result.body.data[1][0].year).toEqual(2022);
    expect(result.body.data[1][0].mileage).toEqual(36000);
    expect(result.body.data[1][0].quality).toEqual(95);
    expect(result.body.data[1][0].isGoodPrice).toEqual(false);
    expect(result.body.data[1][0].location).toEqual('palestine - gaza');
    expect(result.body.data[1][0].state).toEqual('on-market');
    expect(result.body.data[1][0].transmission).toEqual('automatic');
    expect(result.body.data[1][0].description).toEqual('This car had an accedent in the right side but the quality of the body generally is good');
    expect(result.body.data[1][0].fuel).toEqual('diesel');
    expect(result.body.data[1][0].customerId).toEqual(1);
    expect(result.statusCode).toEqual(200);
  });
  test('should return the data i update', async () => {
    const result = await request(app).put('/api/v1/cars/1')
      .set('Cookie', `token=${process.env.ADMIN_TOKEN}`)
      .send({ model: 'husam' })
      .expect(200);
    expect(result.body.data[1][0].brand).toEqual('husam');
    expect(result.body.data[1][0].model).toEqual('husam');
    expect(result.body.data[1][0].price).toEqual(48000);
    expect(result.body.data[1][0].year).toEqual(2022);
    expect(result.body.data[1][0].mileage).toEqual(36000);
    expect(result.body.data[1][0].quality).toEqual(95);
    expect(result.body.data[1][0].isGoodPrice).toEqual(false);
    expect(result.body.data[1][0].location).toEqual('palestine - gaza');
    expect(result.body.data[1][0].state).toEqual('on-market');
    expect(result.body.data[1][0].transmission).toEqual('automatic');
    expect(result.body.data[1][0].description).toEqual('This car had an accedent in the right side but the quality of the body generally is good');
    expect(result.body.data[1][0].fuel).toEqual('diesel');
    expect(result.body.data[1][0].customerId).toEqual(1);
    expect(result.statusCode).toEqual(200);
  });
  test('should return the data i update', async () => {
    const result = await request(app).put('/api/v1/cars/1')
      .set('Cookie', `token=${process.env.ADMIN_TOKEN}`)
      .send({ price: 15 })
      .expect(200);
    expect(result.body.data[1][0].brand).toEqual('husam');
    expect(result.body.data[1][0].model).toEqual('husam');
    expect(result.body.data[1][0].price).toEqual(15);
    expect(result.body.data[1][0].year).toEqual(2022);
    expect(result.body.data[1][0].mileage).toEqual(36000);
    expect(result.body.data[1][0].quality).toEqual(95);
    expect(result.body.data[1][0].isGoodPrice).toEqual(false);
    expect(result.body.data[1][0].location).toEqual('palestine - gaza');
    expect(result.body.data[1][0].state).toEqual('on-market');
    expect(result.body.data[1][0].transmission).toEqual('automatic');
    expect(result.body.data[1][0].description).toEqual('This car had an accedent in the right side but the quality of the body generally is good');
    expect(result.body.data[1][0].fuel).toEqual('diesel');
    expect(result.body.data[1][0].customerId).toEqual(1);
    expect(result.statusCode).toEqual(200);
  });
  test('should delete  cars', async () => {
    const result = await request(app).delete('/api/v1/cars/9')
      .set('Cookie', `token=${process.env.ADMIN_TOKEN}`);
    expect(result.body.msg).toEqual('done!');
  });
  test('should return the data of user', async () => {
    const result = await request(app).post('/api/v1/auth/login')
      .send({ email: 'husam@gmail.com', password: '123456789' })
      .expect(200);
    expect(result.body).toEqual({
      data: {
        email: 'husam@gmail.com',
        id: 1,
        role: 'user',
        username: 'husam',
      },
      msg: null,
    });
  });
  test('should return the password not match', async () => {
    const result = await request(app).post('/api/v1/auth/login')
      .send({ email: 'husam@gmail.com', password: '12345678' })
      .expect(400);
    expect(result.body.message).toEqual('wrong email or password');
  });
  test('should return the password not match', async () => {
    const result = await request(app).post('/api/v1/auth/login')
      .send({ email: 'husam@gmail.com', password: '23456789' })
      .expect(400);
    expect(result.body.message).toEqual('wrong email or password');
  });
  test('Signup', async () => {
    const result = await request(app).post('/api/v1/auth/signup')
      .send({
        email: 'abdo12345@gmail.com', password: '123456789', phoneNumber: '0597111', fullName: 'abdo',
      })
      .expect(201);
    expect(result.body.msg).toEqual('done!');
  });
  test('Signup', async () => {
    const result = await request(app).post('/api/v1/auth/signup')
      .send({
        email: 'abdo123451@gmail.com', password: '123456789', phoneNumber: '0597111', fullName: 'abdo',
      })
      .expect(201);
    expect(result.body.msg).toEqual('done!');
  });
  test('Signup', async () => {
    const result = await request(app).post('/api/v1/auth/signup')
      .send({
        email: 'abdo123451@gmail.com', password: '12345678', phoneNumber: '0597111', fullName: 'abdo',
      })
      .expect(400);
    expect(result.body.message).toEqual('this email is registered');
  });
  test('Signup', async () => {
    const result = await request(app).post('/api/v1/auth/signup')
      .send({
        email: 'abdo@gmail.com', password: '12345678', phoneNumber: '0597111', fullName: 'abdo',
      })
      .expect(400);
    expect(result.body.message).toEqual('this email is registered');
  });
  test('Admin Login', async () => {
    const result = await request(app).post('/api/v1/auth/admin/login')
      .send({ username: 'admin', password: '123456789' });
    expect(result.body.data.role).toEqual('admin');
  });
  test('Admin Login', async () => {
    const result = await request(app).post('/api/v1/auth/admin/login')
      .send({ username: 'admin', password: '123456789' });
    expect(result.body).toEqual({
      msg: null,
      data: {
        id: 1,
        username: 'admin',
        role: 'admin',
      },
    });
  });
  test('Admin Login', async () => {
    const result = await request(app).post('/api/v1/auth/admin/login')
      .send({ username: 'admin1', password: '123456789' });
    expect(result.body.message).toEqual('wrong username or password');
  });
  test('should return old count of cars', async () => {
    const result = await request(app).get('/api/v1/cars');
    expect(result.body.data.count)
      .toEqual(17);
    expect(result.statusCode)
      .toEqual(200);
  });

  test('should not add anything in the cars table', async () => {
    const res = await request(app).post('/api/v1/cars')
      .set('Cookie', 'token= <wrong token>')
      .send({
        brand: 'Toyota',
        model: 'Land cruser',
        year: 2016,
        price: 21000,
        mileage: 93000,
        location: 'palestine - North Gaza',
      });
    expect(res.body).toEqual('Unauthorized');
  });
  test('should add new row in the cars table', async () => {
    const res = await request(app).post('/api/v1/cars')
      .set('Cookie', `token=${process.env.userToken}`)
      .send({
        brand: 'Toyota',
        model: 'Land cruser',
        year: 2016,
        price: 21000,
        mileage: 93000,
        type: 'km',
        location: 'palestine - North Gaza',
      });
    expect(201);
    expect(res.body.msg)
      .toEqual('successfully');
    expect(res.body.data.brand)
      .toEqual('Toyota');
    expect(res.body.data.model)
      .toEqual('Land cruser');
    expect(res.body.data.year)
      .toEqual(2016);
    expect(res.body.data.price)
      .toEqual(21000);
    expect(res.body.data.mileage)
      .toEqual(93000);
    expect(res.body.data.location)
      .toEqual('palestine - North Gaza');
  });
  test('should return new count of cars', async () => {
    const result = await request(app).get('/api/v1/cars');
    expect(result.body.data.count)
      .toEqual(18);
    expect(result.statusCode)
      .toEqual(200);
  });
});

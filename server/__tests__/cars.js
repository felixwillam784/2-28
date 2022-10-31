"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("../src/app"));
const buildFakeData_1 = __importDefault(require("../src/db/config/buildFakeData"));
const connection_1 = __importDefault(require("../src/db/config/connection"));
(0, dotenv_1.config)();
(0, globals_1.beforeAll)(() => (0, buildFakeData_1.default)());
(0, globals_1.afterAll)(() => connection_1.default.close());
function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
(0, globals_1.describe)('/cars endpoint', () => {
    (0, globals_1.test)('should return all cars when there is no filters', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars');
        (0, globals_1.expect)(result.body.data.count).toEqual(18);
        (0, globals_1.expect)(result.body.data.rows.length).toEqual(9);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return all cars when there is no value to query string', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?year=&model=&maxPrice=&mileage=&goodPrice=&fuel=');
        (0, globals_1.expect)(result.body.data.count).toEqual(18);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return all cars made by Toyota', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?brand=Toyota');
        (0, globals_1.expect)(result.body.data.count).toEqual(1);
        (0, globals_1.expect)(result.body.data.rows[0].brand).toEqual('Toyota');
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return Cars model "Sport HSE 3.0L Supercharged V6" ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?model=Sport HSE 3.0L Supercharged V6');
        (0, globals_1.expect)(result.body.data.count).toEqual(1);
        (0, globals_1.expect)(result.body.data.rows[0].model).toEqual('Sport HSE 3.0L Supercharged V6');
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return cars whose mileage is less than or equal to 48000', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?mileage=48000');
        (0, globals_1.expect)(result.body.data.count).toEqual(6);
        (0, globals_1.expect)(result.body.data.rows[getRandomIndex(0, result.body.data.count)].mileage)
            .toBeLessThanOrEqual(48000);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return cars whose year model is 2015 ', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?year=2015');
        (0, globals_1.expect)(result.body.data.count).toEqual(3);
        (0, globals_1.expect)(result.body.data.rows[getRandomIndex(0, result.body.data.count)].year)
            .toEqual(2015);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return cars whose fuel type is diesel', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?fuel=diesel');
        (0, globals_1.expect)(result.body.data.count).toEqual(2);
        (0, globals_1.expect)(result.body.data.rows[getRandomIndex(0, result.body.data.count)].fuel)
            .toEqual('diesel');
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return good price cars', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?goodPrice=1');
        (0, globals_1.expect)(result.body.data.count).toEqual(8);
        (0, globals_1.expect)(result.body.data.rows[getRandomIndex(0, result.body.data.count)].isGoodPrice)
            .toEqual(true);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return all cars(good price or not) when goodPrice=0', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?goodPrice=0');
        (0, globals_1.expect)(result.body.data.count).toEqual(18);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return Not Found message when there is not matches', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?brand=Lamborghini&year=2020');
        (0, globals_1.expect)(result.body.data.rows).toEqual([]);
        (0, globals_1.expect)(result.body.msg).toEqual('Not found');
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return specific car', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars?brand=Lamborghini&year=2017&price=200000');
        (0, globals_1.expect)(result.body.data.count).toEqual(1);
        (0, globals_1.expect)(result.body.data.rows[0].brand).toEqual('Lamborghini');
        (0, globals_1.expect)(result.body.data.rows[0].year).toEqual(2017);
        (0, globals_1.expect)(result.body.data.rows[0].price).toBeLessThanOrEqual(200000);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return details cars', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars/dashboard?state=pending&page=1')
            .set('Cookie', `token=${process.env.ADMIN_TOKEN}`);
        (0, globals_1.expect)(result.body.data.count).toEqual(3);
        (0, globals_1.expect)(result.body.data.rows.length).toEqual(3);
        (0, globals_1.expect)(result.body.data.rows[0].id).toEqual(14);
    }));
    (0, globals_1.test)('should return details cars', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/api/v1/cars/dashboard?state=on-market&page=1')
            .set('Cookie', `token=${process.env.ADMIN_TOKEN}`);
        (0, globals_1.expect)(result.body.data.count).toEqual(13);
        (0, globals_1.expect)(result.body.data.rows.length).toEqual(10);
        (0, globals_1.expect)(result.body.data.rows[0].id).toEqual(1);
    }));
    (0, globals_1.test)('should return id of car that update', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).put('/api/v1/cars/1')
            .set('Cookie', `token=${process.env.ADMIN_TOKEN}`);
        (0, globals_1.expect)(result.body.data[0]).toEqual(0);
        (0, globals_1.expect)(result.body.msg).toEqual('done!');
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return id of car that update', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).put('/api/v1/cars/1')
            .set('Cookie', '');
        (0, globals_1.expect)(result.body).toEqual('Unauthorized');
        (0, globals_1.expect)(result.statusCode).toEqual(401);
    }));
    (0, globals_1.test)('should return the data i update', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).put('/api/v1/cars/1')
            .set('Cookie', `token=${process.env.ADMIN_TOKEN}`)
            .send({ brand: 'husam' })
            .expect(200);
        (0, globals_1.expect)(result.body.data[1][0].brand).toEqual('husam');
        (0, globals_1.expect)(result.body.data[1][0].model).toEqual('Land Cruiser VXR 4.0L V6');
        (0, globals_1.expect)(result.body.data[1][0].price).toEqual(48000);
        (0, globals_1.expect)(result.body.data[1][0].year).toEqual(2022);
        (0, globals_1.expect)(result.body.data[1][0].mileage).toEqual(36000);
        (0, globals_1.expect)(result.body.data[1][0].quality).toEqual(95);
        (0, globals_1.expect)(result.body.data[1][0].isGoodPrice).toEqual(false);
        (0, globals_1.expect)(result.body.data[1][0].location).toEqual('palestine - gaza');
        (0, globals_1.expect)(result.body.data[1][0].state).toEqual('on-market');
        (0, globals_1.expect)(result.body.data[1][0].transmission).toEqual('auto');
        (0, globals_1.expect)(result.body.data[1][0].description).toEqual('This car had an accedent in the right side but the quality of the body generally is good');
        (0, globals_1.expect)(result.body.data[1][0].fuel).toEqual('diesel');
        (0, globals_1.expect)(result.body.data[1][0].customerId).toEqual(1);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return the data i update', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).put('/api/v1/cars/1')
            .set('Cookie', `token=${process.env.ADMIN_TOKEN}`)
            .send({ model: 'husam' })
            .expect(200);
        (0, globals_1.expect)(result.body.data[1][0].brand).toEqual('husam');
        (0, globals_1.expect)(result.body.data[1][0].model).toEqual('husam');
        (0, globals_1.expect)(result.body.data[1][0].price).toEqual(48000);
        (0, globals_1.expect)(result.body.data[1][0].year).toEqual(2022);
        (0, globals_1.expect)(result.body.data[1][0].mileage).toEqual(36000);
        (0, globals_1.expect)(result.body.data[1][0].quality).toEqual(95);
        (0, globals_1.expect)(result.body.data[1][0].isGoodPrice).toEqual(false);
        (0, globals_1.expect)(result.body.data[1][0].location).toEqual('palestine - gaza');
        (0, globals_1.expect)(result.body.data[1][0].state).toEqual('on-market');
        (0, globals_1.expect)(result.body.data[1][0].transmission).toEqual('auto');
        (0, globals_1.expect)(result.body.data[1][0].description).toEqual('This car had an accedent in the right side but the quality of the body generally is good');
        (0, globals_1.expect)(result.body.data[1][0].fuel).toEqual('diesel');
        (0, globals_1.expect)(result.body.data[1][0].customerId).toEqual(1);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should return the data i update', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).put('/api/v1/cars/1')
            .set('Cookie', `token=${process.env.ADMIN_TOKEN}`)
            .send({ price: 15 })
            .expect(200);
        (0, globals_1.expect)(result.body.data[1][0].brand).toEqual('husam');
        (0, globals_1.expect)(result.body.data[1][0].model).toEqual('husam');
        (0, globals_1.expect)(result.body.data[1][0].price).toEqual(15);
        (0, globals_1.expect)(result.body.data[1][0].year).toEqual(2022);
        (0, globals_1.expect)(result.body.data[1][0].mileage).toEqual(36000);
        (0, globals_1.expect)(result.body.data[1][0].quality).toEqual(95);
        (0, globals_1.expect)(result.body.data[1][0].isGoodPrice).toEqual(false);
        (0, globals_1.expect)(result.body.data[1][0].location).toEqual('palestine - gaza');
        (0, globals_1.expect)(result.body.data[1][0].state).toEqual('on-market');
        (0, globals_1.expect)(result.body.data[1][0].transmission).toEqual('auto');
        (0, globals_1.expect)(result.body.data[1][0].description).toEqual('This car had an accedent in the right side but the quality of the body generally is good');
        (0, globals_1.expect)(result.body.data[1][0].fuel).toEqual('diesel');
        (0, globals_1.expect)(result.body.data[1][0].customerId).toEqual(1);
        (0, globals_1.expect)(result.statusCode).toEqual(200);
    }));
    (0, globals_1.test)('should delete  cars', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).delete('/api/v1/cars/9')
            .set('Cookie', `token=${process.env.ADMIN_TOKEN}`);
        (0, globals_1.expect)(result.body.msg).toEqual('done!');
    }));
    (0, globals_1.test)('should return the data of user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).post('/api/v1/auth/login')
            .send({ email: 'husam@gmail.com', password: '123456789' })
            .expect(200);
        (0, globals_1.expect)(result.body).toEqual({
            data: {
                email: 'husam@gmail.com',
                id: 1,
                role: 'user',
                userName: 'husam',
            },
            msg: null,
        });
    }));
    (0, globals_1.test)('should return the password not match', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).post('/api/v1/auth/login')
            .send({ email: 'husam@gmail.com', password: '12345678' })
            .expect(400);
        (0, globals_1.expect)(result.body.message).toEqual('wrong email or password');
    }));
    (0, globals_1.test)('should return the password not match', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).post('/api/v1/auth/login')
            .send({ email: 'hsam@gmail.com', password: '123456789' })
            .expect(400);
        (0, globals_1.expect)(result.body.message).toEqual('wrong email or password');
    }));
    (0, globals_1.test)('Signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).post('/api/v1/auth/signup')
            .send({
            email: 'abdo12345@gmail.com', password: '123456789', phoneNumber: '0597111', fullName: 'abdo',
        })
            .expect(201);
        (0, globals_1.expect)(result.body.msg).toEqual('done!');
    }));
    (0, globals_1.test)('Signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).post('/api/v1/auth/signup')
            .send({
            email: 'abdo123451@gmail.com', password: '123456789', phoneNumber: '0597111', fullName: 'abdo',
        })
            .expect(201);
        (0, globals_1.expect)(result.body.msg).toEqual('done!');
    }));
    (0, globals_1.test)('Signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).post('/api/v1/auth/signup')
            .send({
            email: 'abdo123451@gmail.com', password: '12345678', phoneNumber: '0597111', fullName: 'abdo',
        })
            .expect(400);
        (0, globals_1.expect)(result.body.message).toEqual('this email is registered');
    }));
    (0, globals_1.test)('Signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).post('/api/v1/auth/signup')
            .send({
            email: 'abdo@gmail.com', password: '12345678', phoneNumber: '0597111', fullName: 'abdo',
        })
            .expect(400);
        (0, globals_1.expect)(result.body.message).toEqual('this email is registered');
    }));
});
//# sourceMappingURL=cars.js.map
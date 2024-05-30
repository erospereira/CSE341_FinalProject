const app = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)
const { MongoClient } = require('mongodb');

describe('Test Handlers', () => {
    
    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('users')
    });
    afterAll(async() => {
        await connection.close()
    })
    test('responds to /user', async () => {
        const res = await request.get('/user/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
        expect(JSON.parse(res.text).some(x => x.lastName === "Cook")).toBe(true)
    })
    test('responds to /plant', async () => {
        const res = await request.get('/plant/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
        expect(JSON.parse(res.text).some(x => x.name === "Rose")).toBe(true)
    })

    test('responds to /order', async () => {
        const res = await request.get('/order/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
        expect(JSON.parse(res.text).some(x => x.orderNumber=== "12345")).toBe(true)
    })

    test('responds to /gardening-supplies', async () => {
        const res = await request.get('/gardening-supplies/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
        expect(JSON.parse(res.text).some(x => x.product === "Tomato Seeds")).toBe(true)
    })


})
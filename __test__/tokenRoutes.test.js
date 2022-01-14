const request = require('supertest');
const app = require('../server');
const { mongoConnect, mongoDisconnect } = require('../services/mongo');


jest.setTimeout(3000000);


let token = '';
describe('API', () => {
    let payload = {
        "email": "dtglov@gmail.com",
        "password": "dave112"
    };
    beforeAll(async () => {
        await mongoConnect();
        const response = await request(app).post('/auth/signin')
            .send(payload);
        token = response.body.token;
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('TEST GET ALL USERS /user', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/item')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('Test GET USER', () => {
        let validUserId = "61ddcd2b61cf67104082eac2";
        let invalidUserId = "41224d776a326fb40f000001";

        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get(`/item/${validUserId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json');
            // .expect('Content-Type', 'application/json');
            expect(response.statusCode).toBe(200);
        });

        test('It should catch wrong ID passed in', async () => {
            const response = await request(app)
                .get(`/item/${invalidUserId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            // .expect('Content-Type', /json/)
            // .expect(204);
            expect(response.statusCode).toBe(204);
            // expect(response.body).toEqual({
            //     message: `No user matches ID ${invalidUserId}`
            // });
        });
    });

    describe('Test GET ALL ITEMS /item', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/item')
                // .expect('Content-Type', /json/)
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });
    });

    let validId = "61ddeab5eb6fbce783b6087f";
    let invalidId = "41224d776a326fb40f000001";

    describe('Test GET /item', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get(`/item/${validId}`)
                // .expect('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test('It should catch wrong ID passed in', async () => {
            const response = await request(app)
                .get(`/item/${invalidId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(204);
        });
    });

    describe('Test DELETE ITEM', () => {
        test('It should respond with 200', async () => {
            const response = await request(app)
                .delete('/item')
                .send(validId)
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test('It should check if item does not exist', async () => {
            const response = await request(app)
                .delete('/item')
                .expect('Content-Type', /json/)
                .set('Authorization', `Bearer ${token}`)
                .expect(400);
            expect(response.body).toEqual({
                "message": "Item ID required."
            });
        });
    });

});


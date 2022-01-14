const request = require('supertest');
const app = require('../server');
const { mongoConnect, mongoDisconnect } = require('../services/mongo');

jest.setTimeout(3000000);


describe('API', () => {

    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });


    describe('TEST POST /auth/signup', () => {
        const signupData = {
            firstName: "Kilom",
            lastName: "Seqnoo",
            email: "kilom@gmail.com",
            password: "ffri2211",
            address: "Java Avenue Street"
        };

        const signupDataWithoutEmail = {
            firstName: "Kilom",
            lastName: "Seqnoo",
            password: "fri2211",
            address: "Java Avenue Street"
        };
        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/auth/signup')
                .send(signupData)
                .expect('Content-Type', /json/)
                .expect(201);
            // expect(response.statusCode).toBe(201);
            // console.log(response.body);

            const requestEmail = signupData.email;
            const responseEmail = response.body.result.email;

            expect(responseEmail).toBe(requestEmail);
            // expect(response.body).toMatchObject(signupDataWithoutEmail);
        });


        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/auth/signup')
                .send(signupDataWithoutEmail)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toEqual({
                error: 'All Fields must be filled.'
            });
        });
    });

    describe('Test POST /auth/signin', () => {
        const signinData = {
            email: "kilom@gmail.com",
            password: "ffri2211",
        };

        const signinWithBlank = {};

        test('It should respond with 200', async () => {
            const response = await request(app)
                .post('/auth/signin')
                .send(signinData)
                .expect('Content-Type', /json/);
            expect(response.statusCode).toBe(200);
        });

        test('It should catch missing fields', async () => {
            const response = await request(app)
                .post('/auth/signin')
                .send(signinWithBlank)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toEqual({
                message: 'email and password are required'
            });
            ;
        });
    });

});


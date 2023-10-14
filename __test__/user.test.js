const mongoose = require("mongoose")
const request = require("supertest")

const app = require("../index")

const helper = require('../helpers/user.helper')


require("dotenv").config()
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe('Check users route requests', () => {
    it('Get all users', async() => {
        const res = await request(app)
            .get('/api/users')

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBeTruthy()
        expect(res.body.data.length).toBeGreaterThan(0)
    }, 10000);

    it('Get a user', async () => {

        const result = await helper.findLastInsertedUser()
        const res = await request(app)
            .get("/api/users/" + result.username)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBeTruthy()
        expect(res.body.data.username).toBe(result.username)
        expect(res.body.data.email).toBe(result.email)

    });

    it('Post create a user ', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                username: 'test4',
                password: '12345',
                name: 'name for test 4',
                surname: 'surname for test4',
                email: 'test4@aueb.gr'
            })
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBeTruthy()
    });

    it('Post create a user that already exists', async () => {
        const result = await helper.findLastInsertedUser()

        const res = await request(app)
            .post("/api/users")
            .send({
                username: result.username,
                password: '12345',
                name: result.name,
                surname: result.surname,
                email: result.email
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.status).toBeFalsy()
    });

    it('Patch update a user', async () => {
        const result = await helper.findLastInsertedUser()

        const res = await request(app)
            .patch('/api/users' + result.username)
            .send({
                username: 'test4',
                password: '12345',
                name: 'name for test 4',
                surname: 'surname for test4',
                email: 'test4@aueb.gr'
            })
    });
});

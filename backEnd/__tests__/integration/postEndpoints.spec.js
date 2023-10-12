const request = require('supertest')
const app = require('../../app')
const { resetTestDB } = require('./config')
const { describe } = require('node:test')

describe('api server', () => {
    let api
    
    beforeEach(async () => {
        await resetTestDB()
    })
    
    beforeAll(() => {
        api = app.listen(4000, () => {
            console.log('Test server running on port 4000')
        })
    })
    
    afterAll((done) => {
        console.log('Closing test server')
        api.close(done)
    })
    
    // As a user I can access the posts database
    test('responds to GET / with a 200 status code', (done) => {
        request(api).get('/').expect(200, done)
    })
    
    test('responds to GET / with a message and a description', async () => {
        const response = await request(api).get('/')
        
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe('Florin County Council Issue Reporting App')
        expect(response.body.description).toBe('An issues reporting and tracking app for Florin County Council')
    })
    
    // As a user I can see all the posts
    test.skip('responds to GET /posts with a 200 status code', (done) => {
        request(api).get('/posts').expect(200, done)
    })
    
    test.skip('GET /posts displays 3 elements in the web browser', async () => {
        const response = await request(api).get('/posts')
        expect(response.body.data.length).toBe(3)
    })

  // As as user I cannot post to /
    test.skip('responds to invalid method request with 405', (done) => {
        request(api).post('/').expect(405, done)
    })

    // As a user I can see one post by its ID
    test.skip('responds to GET /posts/:id with a 200', (done) => {
        request(api).get('/posts/3').expect(200, done)
    })
    
    test.skip('responds to a unknown post id with a 404 status code', (done) => {
        request(api)
            .get('/posts/42')
            .expect(404)
            .expect({error :"Unable to locate post."}, done)
    })
    
    // As a user I can add a post to the database
    test.skip('responds to POST /posts with a 201 status code', (done) => {
        const testData = {
            title: "post 4",
            content: "content for post 4",
            date: "2023/10/04",
            categories: "potholes",
            votes: 0
    }
    
    request(api)
        .post('/posts')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect({ data: { ...testData, id: 4 } }, done)
    })

  // As a user I can update the details for one post
    test.skip('responds to PATCH /posts/1 with status 200', (done) => {
        const testData = {
            title: "post 1 updated",
            content: "content for post 1 updated",
            date: "2023/10/01",
            categories: "No more potholes",
            votes: 0
        }

    request(api)
        .patch('/posts/1')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(200)
        .expect({ data: { ...testData, id: 1 } }, done)
    })

  // As a user I can delete a post
    test.skip('responds to DELETE /posts/:id with status 204', (done) => {
        request(api).delete('/posts/1').expect(204, done)
    })

    test.skip('responds to DELETE with a 404 status code if the post does not exist', (done) => {
        request(api).delete('/posts/42').expect(404, done)
    })

    test.skip('responds to DELETE /posts/:id with status 204', async () => {
        const responseBeforeDeletion = await request(api).get('/posts')
        expect(responseBeforeDeletion.body.data.length).toBe(3)

        await request(api).delete('/posts/1').expect(204)

        const responseAfterDeletion = await request(api).get('/posts')
        expect(responseAfterDeletion.body.data.length).toBe(2)
    })
})
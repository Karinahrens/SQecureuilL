const postsController = require('../../../controllers/postsController');
const Post = require('../../../models/post');

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }


describe('posts controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(postsController).toBeDefined()
    })

    describe('index', () => { 
        it('should return posts with a status code 200', async () => {
            const testPosts = ['p1', 'p2']
            jest.spyOn(Post, 'getAll')
                .mockResolvedValue(testPosts)

            await postsController.index(null, mockRes)
            expect(Post.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith({ data: testPosts })
        })

        it('sends an error upon fail', async () => {
            jest.spyOn(Post, 'getAll')
                .mockRejectedValue(new Error('Something happened to your db'))

            await postsController.index(null, mockRes)
            expect(Post.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })
    })

    describe('show', () => {
        let testPost, mockReq
        beforeEach(() => {
            testPost = { id: 1, title: " test post", content: "content for test post", date: "2023/10/10", categories: "potholes", votes: 0 }
            mockReq = { params: { id: 1 } }
        })

        it('returns a post with a 200 status code', async () => {
            jest.spyOn(Post, 'getOneById')
                .mockResolvedValue(new Post(testPost))

            await postsController.show(mockReq, mockRes)
            expect(Post.getOneById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith({ data: new Post(testPost) })
        })

        it('sends an error upon fail', async () => {
            jest.spyOn(Post, 'getOneById')
                .mockRejectedValue(new Error('oh no'))

            await postsController.show(mockReq, mockRes)
            expect(Post.getOneById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
            })
        })

    describe('create', () => {
        test('it returns a new post with a 201 status code', async () => {
            let testPost = { title: "test post", content: "content for test post", date: "2023/10/11", categories: "potholes", votes: 0 }
            const mockReq = { body: testPost }

            jest.spyOn(Post, 'create')
                .mockResolvedValue(new Post(testPost))

            await postsController.create(mockReq, mockRes)
            expect(Post.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockSend).toHaveBeenCalledWith({ data: new Post({ ...testPost }) })
        })


        test('it returns an error', async () => {
            let testPost = { name: 'Test post' }
            const mockReq = { body: testPost }

            jest.spyOn(Post, 'create')
                .mockRejectedValue(new Error('oh no'))

            await postsController.create(mockReq, mockRes)
            expect(Post.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
        })
    })

    describe('update', () => {
        it('modifies a row in the database', async () => {
            const testPost = { id: 22, title: "test post", content: "content for test post", date: "2023/10/11", categories: "potholes", votes: 0 }
            jest.spyOn(Post, 'getOneById')
                .mockResolvedValue(new Post(testPost))

            const mockReq = { params: { id: 22 }, body: { name: 'test post 2' } }

            jest.spyOn(Post.prototype, 'update')
                .mockResolvedValue({ ...new Post(testPost), name: 'test post 2' })

            await postsController.update(mockReq, mockRes)


            expect(Post.getOneById).toHaveBeenCalledTimes(1)
            expect(Post.prototype.update).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith({ data: new Post({ id: 22, title: "test post 2", content: "content for test post", date: "2023/10/11", categories: "potholes", votes: 0 }) })
        })
    })

    describe('destroy', () => {
        it('returns a 204 status code on successful deletion', async () => {
            const testPost = { id: 1, title: "test post", content: "content for test post", date: "2023/10/11", categories: "potholes", votes: 0 }
            jest.spyOn(Post, 'getOneById')
                .mockResolvedValue(new Post(testPost))

            jest.spyOn(Post.prototype, 'destroy')
                .mockResolvedValue(new Post(testPost))

            const mockReq = { params: { id: 1 } }
            await postsController.destroy(mockReq, mockRes)

            expect(Post.getOneById).toHaveBeenCalledTimes(1)
            expect(Post.prototype.destroy).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(204)
            expect(mockEnd).toHaveBeenCalledWith()
        })

        it('calls post.destroy()', async () => {
            const mockReq = { params: { id: 49 } }

            jest.spyOn(Post, 'getOneById')
                .mockRejectedValue(new Error('post not found'))

            await postsController.destroy(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockSend).toHaveBeenCalledWith({ error: 'post not found' })
        })
    })
})
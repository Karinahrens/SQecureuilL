const Post = require('../../../models/post');
const db = require('../../../database/connect');
// We need to mock the data, because we do not want to modify data from the database

describe('Post', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Post).toBeDefined()
    })

    describe('getAll', () => {
        it('resolves with posts on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ title: "test post 1", content: "content for test post 1", date: "2023/10/01", categories: "potholes", votes: 0 }, { title: "test post 2", content: "content for test post 2", date: "2023/10/02", categories: "potholes", votes: 0 }, { title: "test post 3", content: "content for test post 3", date: "2023/10/03", categories: "potholes", votes: 0 }]
                })

            const posts = await Post.getAll()
            expect(posts).toHaveLength(3)
            expect(posts[0]).toHaveProperty('id')
        })

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [] })

            try {
                await Post.getAll()
            } catch (err) {
                expect(err).toBeDefined()
                expect(err.message).toBe("No posts available.")
            }
        })
    })

    describe('getOneById', () => {
        it('resolves with post on successful db query', async () => {
            let testPost = { id: 1, title: "test post 1", content: "content for test post 1", date: "2023/10/01", categories: "potholes", votes: 0 }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [testPost] })

            const result = await Post.getOneById(1)
            expect(result).toBeInstanceOf(Post)
            expect(result.title).toBe('test post 1')
            expect(result.id).toBe(1)
        })

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query').mockRejectedValue()

            try {
                await Post.getOneById('red')
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('This post does not exist!')
            }
        })
    })

    describe('create', () => {
        it('resolves with post on successful db query', async () => {
            let postData = { title: "test post 4", content: "content for test post 4", date: "2023/10/04", categories: "potholes", votes: 0 }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [] })

            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{ ...postData, id: 1 }] })

            const result = await Post.create(postData)
            expect(result).toBeTruthy()
            expect(result).toHaveProperty('id')
            expect(result).toHaveProperty('title')
        })

        it('should throw an Error on db query error', async () => {

            try {
                await Post.create({ title: "something" })
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('content or date or categories or votes is missing')
            }
        })
    })

    describe('updatePost', () => {
        it('should throw an error if title is missing', async () => {
            try {
                const post = new Post({ title: "test post 5", content: "content for test post 5", date: "2023/10/05", categories: "potholes", votes: 0 })
                await post.update({ content: "content for test post 5", date: "2023/10/05", categories: "potholes", votes: 0 })
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('title or content or date or categories or votes is missing')
            }
        })
    })

    describe('destroy', () => {
        it('should return the deleted post', async () => {
            const post = new Post({})
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{ id: 42, title: "test post 5", content: "content for test post 5", date: "2023/10/05", categories: "potholes", votes: 0 }] })

            const result = await post.destroy()

            expect(result).toBeInstanceOf(Post)
            expect(result.id).toBe(42)
            expect(result).not.toEqual(post)
        })

        it('should throw an error if we cannot locate the post', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}] })

            try {
                const post = new Post({ title: "test post 6", content: "content for test post 6", date: "2023/10/06", categories: "potholes", votes: 0 })
                await post.destroy({ title: 'test post 42' })
            } catch (error) {
                expect(error).toBeTruthy()
            }
        })
    })
})
const Post = require('../models/Post');

async function index(req, res) {
    try {
        const posts = await Post.getAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const newPost = await Post.create(data);
        res.status(201).json(newPost);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const post = await Post.getOneById(id);
        const result = await post.update(data);
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const post = await Post.getOneById(id);
        const result = await post.destroy();
        res.json(result);
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = { index, show, create, update, destroy }
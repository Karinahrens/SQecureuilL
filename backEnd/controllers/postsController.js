const Post = require('../models/Post');

async function index(req, res) {
    try {
        const posts = await Post.getAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function indexCategory(req, res) {
    const id = req.params.id;
    try {
        const posts = await Post.getByCategory(id);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function indexDate(req, res) {
    try {
        const posts = await Post.sortByDate();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function indexVote(req, res) {
    try {
        const posts = await Post.sortByVotes();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function indexStatus(req, res) {
    try {
        const posts = await Post.sortByStatus();
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

async function orderBy(req, res) {
    try {
    const posts = await Post.getPostsByCategoryAndSort();
    res.status(200).json(posts);
    } catch (err) {
    res.status(500).json({error: err.message})
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        console.log(data)
        const newPost = await Post.create(data);
        res.status(201).json(newPost);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const post = await Post.getOneById(id);
        console.log(post)
        const result = await post.updatePost(data);
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

module.exports = { index,indexCategory, indexDate ,indexVote,indexStatus,show,orderBy, create, update, destroy }
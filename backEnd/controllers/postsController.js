const Post = require('../models/post');

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

async function indexCategoryDate(req, res) {
    const id = req.params.id;
    try {
        const posts = await Post.getByCategoryDate(id);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function indexCategoryVote(req, res) {
    const id = req.params.id;
    try {
        const posts = await Post.getByCategoryVote(id);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function indexCategoryStage(req, res) {
    const id = req.params.id;
    try {
        const posts = await Post.getByCategoryStage(id);
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

async function indexStage(req, res) {
    try {
        const posts = await Post.sortByStage();
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
        const category = req.query.category;
        const sort = req.query.sort;
        
        const posts = await Post.getPostsByCategoryAndSort(category, sort);
        
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

async function upVote(req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        console.log(post);
        const result = await post.updateVote({ post_votes: 1 }, id); // Just send an increment of 1
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

async function downVote(req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        const result = await post.updateVote({ post_votes: -1 }, id); // Decrease by 1
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({error: err.message});
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

module.exports = { index,indexCategory,indexCategoryDate, indexCategoryVote,indexCategoryStage,indexDate ,indexVote,indexStage,show,orderBy, create, update, upVote,downVote, destroy }


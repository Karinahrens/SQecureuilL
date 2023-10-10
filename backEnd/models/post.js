const db = require('../database/connect');

class Post {

    constructor({ post_id, post_title, post_content, post_date,post_votes,post_categories,post_Status}) {
        this.id = post_id;
        this.title = post_title;
        this.content = post_content;
        this.date =post_date;
        this.votes =post_votes;
        this.categories =post_categories;
        this.Status =post_Status;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM post");
        return response.rows.map(p => new Post(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM post WHERE post_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async getByCategory(Category) {
        const response = await db.query("SELECT * FROM post WHERE LOWER(post_categories) = LOWER($1)", [Category]);
        return response.rows.map(p => new Post(p));
    }
    
    static async sortByDate() {
        const response = await db.query("SELECT * FROM post ORDER BY post_date");
        return response.rows.map(p => new Post(p));
    }

    static async sortByVotes() {
        const response = await db.query("SELECT * FROM post ORDER BY post_votes DESC");
        return response.rows.map(p => new Post(p));
    }

    static async sortByStatus() {
        const response = await db.query("SELECT * FROM post ORDER BY post_status");
        return response.rows.map(p => new Post(p));
    }

    static async create(data) {
        const {post_title, post_content,post_date,post_categories } = data;
        let response = await db.query("INSERT INTO post ( post_title, post_content, post_date,post_categories) VALUES ($1, $2,$3,$4) RETURNING post_id;", [post_title, post_content,post_date,post_categories]);
        const newId = response.rows[0].post_id;
        const newPost = await Post.getOneById(newId);
        return newPost;
    }

    async voteUpPost(data,id) {
        const { votes } = data;   
        const response = await db.query("UPDATE post SET post_votes = $1  WHERE post_id= $2 RETURNING *;",[ votes, id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update votes.")
        }
        return new Post(response.rows[0]);
    }

    async updatePost(data,id) {
        const {post_title, post_content,post_date,post_categories } = data;
        const response = await db.query("UPDATE post SET post_title= $1, post_content=$2, post_date=$3,post_categories =$4  WHERE post_id= $5 RETURNING *;",[ post_title, post_content,post_date,post_categories, this.id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update Post.")
        }
        return new Post(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.id]);
        return new Post(response.rows[0]);
    }

}

module.exports = Post;

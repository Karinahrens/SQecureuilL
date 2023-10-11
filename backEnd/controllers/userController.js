const bcrypt = require('bcrypt');

const User = require('../models/User');
const Token = require('../models/Token');

async function register (req, res) {
    try {
        const data = req.body;

        // Generate a salt with a specific cost
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Hash the password
        data["password"] = await bcrypt.hash(data["password"], salt);

        const result = await User.create(data);

        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function login (req, res) {
    const data = req.body;
    try {
        const user = await User.getOneByUsername(data.username);
        console.log("User", user)
        const authenticated = await bcrypt.compare(data.password, user["password"]);
        console.log("Authenticated", authenticated)
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            const token = await Token.create(user.id);
            res.status(200).json({ authenticated: true, token: token.token });
        }
        
    } catch (err) {
        res.status(403).json({"error": err.message})
    }
}

module.exports = {
    register, login
}                           

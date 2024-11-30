const user = require("../Models/userSchema");
const jwt = require('jsonwebtoken');
 
// register
exports.register = async (req, res) => {
    console.log("inside register function");
    const { username, email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json("user already exists.... please login");
        } else {
            const newUser = new user({ username, email, password, profileImage: '', github: '', linkedin: '' });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (err) {
        res.status(401).json(err);
    }
};

// login
exports.login = async (req, res) => {
    console.log("inside login function");
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email, password });
        console.log(existingUser);
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.jwt_sercet);
            res.status(200).json({ existingUser, token });
        } else {
            res.status(406).json("Invalid email/password");
        }
    } catch (err) {
        res.status(401).json(err);
    }
};

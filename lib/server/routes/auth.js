const express = require("express");
const User = require("../model/user");
const authRouter = express.Router();
var jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

authRouter.post('/api/signup', async (req, res) => {
    
    try {
        const { name, email, profilePic } = req.body;
        let user = await User.findOne({ email: email });

        if (user == null) {
            user = new User({
                email: email,
                profilePic: profilePic,
                name: name,
            }
        );
            user = await user.save();
        }
        
        const token =  jwt.sign({id : user._id},"passwordkey");

        res.json({ user, token });
    }
    
    catch (e) {
        res.status(500).json({error : e.message})
    }
});
authRouter.get('/', auth, async (req, res) => {

    const user = await User.findById(req.user);
    res.json({ user, token: req.user });
    

})

module.exports = authRouter; 

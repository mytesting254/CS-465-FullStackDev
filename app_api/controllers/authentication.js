const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).json({ "message": "All fields required" });
        return;
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    

    user.save((err) => {
        if (err) {
            res.status(400).json(err);
        } else {
            const token = user.generateJwt();
            res.status(200).json({ "token": token });
        }
    }
    );

}

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400)
        .json({ "message": "All fields required" });
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res
                .status(404)
                .json(err);           
        }
        if (user) {
            const token = user.generateJwt();
            res
                .status(200)
                .json({ "token": token });
        } else {
            res
                .status(401)
                .json(info);
        }
    })(req, res);
}

module.exports = {
    register,
    login
}

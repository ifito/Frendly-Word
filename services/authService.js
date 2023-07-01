const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constans');

//exports.findByUsername = (username) => User.findOne({ username });

exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');
    }

    //TODO: Check user exists
    const existingUser = await User.findOne({
        $or: [
            { email },
            //{ username }
        ]
    });

    if (existingUser) {
        throw new Error('User exists');
    }

    // TODO: Validate password

    if (password.length < 4) {
        throw new Error('Password too short');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    return this.login(email, password);
};

exports.login = async (email, password) => {

    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email,
        //username: user.username,
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
};

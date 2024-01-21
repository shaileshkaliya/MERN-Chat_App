const User = require('../model/user-model.js');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const userCheck = await User.findOne({ username: username });
        if (userCheck) {
            return res.status(409).json({ message: "Username already exists", status: false });
        }

        const emailCheck = await User.findOne({ email: email });
        if (emailCheck) {
            return res.status(409).json({ message: "Email already exists", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        const savedUser = await user.save();
        const userWithoutPassword = savedUser.toJSON();
        delete userWithoutPassword.password;

        return res.status(201).json({ status: true, user: userWithoutPassword });
    } catch (error) {
        next(error);
    }
};

module.exports = { register };

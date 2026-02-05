const User = require('../models/ik');

const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User Created in Compass!" });
};

exports.addTodo = async (req, res) => {
    const { email, todo } = req.body;
    await User.findOneAndUpdate({ email }, { $push: { todos: todo } });
    res.json({ message: "Todo Added!" });
};

exports.deleteTodo = async (req, res) => {
    const { email, todo } = req.body;
    await User.findOneAndUpdate({ email }, { $pull: { todos: todo } });
    res.json({ message: "Todo Deleted!" });
};
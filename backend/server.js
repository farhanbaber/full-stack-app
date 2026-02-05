const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Compass Connected!"))
.catch(err => console.log(err));

const { register, addTodo, deleteTodo } = require('./controllers/todoController');
app.post('/register', register);
app.post('/add-todo', addTodo);
app.post('/delete-todo', deleteTodo);

app.listen(5000, () => console.log("Server running on port 5000"));
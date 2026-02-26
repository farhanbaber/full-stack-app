const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
// process.env.MONGO_URI ko Railway ke 'Variables' tab mein lazmi add karna
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch(err => console.log("MongoDB Connection Error:", err));

const { register, addTodo, deleteTodo } = require('./controllers/todoController');

app.post('/register', register);
app.post('/add-todo', addTodo);
app.post('/delete-todo', deleteTodo);

// Railway ke liye PORT aur 0.0.0.0 binding zaroori hai
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
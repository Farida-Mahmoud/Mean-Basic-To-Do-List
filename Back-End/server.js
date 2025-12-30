const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/tododb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Schema & Model
const todoSchema = new mongoose.Schema({
  text: String
});

const Todo = mongoose.model('Todo', todoSchema);

// Get all todos
app.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a todo
app.post('/', async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

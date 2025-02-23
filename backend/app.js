// Load environment variables from .env file
require("dotenv").config();

const express = require("express"); // Import Express.js
const cors = require("cors");       // Import CORS middleware
const mongoose = require("mongoose"); // Import Mongoose for MongoDB

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 5000; // Set port (default to 5000)

// Middleware
app.use(express.json()); // Allows app to parse JSON data
app.use(cors()); // Enables frontend to communicate with backend

// ✅ 1. CONNECT TO MONGODB DATABASE
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected")) // Success message
  .catch(err => console.error("❌ MongoDB Error:", err)); // Catch connection error

// ✅ 2. DEFINE TODO SCHEMA (STRUCTURE OF TODO DATA)
const todoSchema = new mongoose.Schema({
  text: String,       // Task description
  completed: Boolean  // Task status (true = done, false = not done)
});

// Create a MongoDB collection called "todos"
const Todo = mongoose.model("Todo", todoSchema);

// ✅ 3. API ROUTES

// 🔹 GET all todos
app.get("/todo", async (req, res) => {
  const todos = await Todo.find(); // Fetch all todos from MongoDB
  res.json(todos); // Send back as JSON
});

// 🔹 POST (Add a new todo)
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,   // Take "text" from frontend request
    completed: false       // By default, new todos are incomplete
  });

  await newTodo.save(); // Save todo to MongoDB
  res.json(newTodo); // Send the newly created todo back as response
});

// 🔹 DELETE (Remove a todo by ID)
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id); // Find todo by ID and delete it
  res.json({ message: "Todo deleted" }); // Send success message
});

// ✅ 4. START SERVER
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));


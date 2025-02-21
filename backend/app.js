require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const todoSchema = new mongoose.Schema({ text: String, completed: Boolean });
const Todo = mongoose.model("Todo", todoSchema);

// Routes
app.get("/todos", async (req, res) => res.json(await Todo.find()));
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ text: req.body.text, completed: false });
  await newTodo.save();
  res.json(newTodo);
});
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));

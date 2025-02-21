import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import './App.css';

function App() {
  const API_URL = "http://localhost:5000/todos";
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    });
    const data = await res.json();
    setTodos([...todos, data]); // Update UI immediately
    setNewTodo("");
    console.log(setNewTodo)
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos(todos.filter(todo => todo._id !== id)); // Remove from UI
  };

  return (
    <div className="App">
      <h1>📝 MongoDB To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

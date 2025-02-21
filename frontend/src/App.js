// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/todos"; // Backend URL

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // 📌 Function to Fetch Todos from Database
  const fetchTodos = () => {
    axios.get(API_URL)
      .then(response => setTodos(response.data)) // Update todos state with latest data
      .catch(error => console.error("Error fetching todos:", error));
  };

  // 📌 Fetch todos on initial load
  useEffect(() => {
    fetchTodos();
  }, []);

  // 📌 Function to Add a New Todo
  const addTodo = () => {
    if (!newTodo.trim()) return;

    axios.post(API_URL, { text: newTodo })
      .then(() => {
        setNewTodo(""); // Clear input field
        fetchTodos(); // Fetch latest todos from database
      })
      .catch(error => console.error("Error adding todo:", error));
  };

  // 📌 Function to Delete a Todo
  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        fetchTodos(); // Fetch latest todos from database after delete
      })
      .catch(error => console.error("Error deleting todo:", error));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <input 
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>

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

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// 1. Live Backend ka link yahan rakh rahe hain
const API_URL = "https://full-stack-app-production-63d7.up.railway.app";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);

const handleRegister = async () => {
  console.log("Register Button Dab Gaya!");
  try {
    // ✅ Localhost ki jagah API_URL use kiya
    const res = await axios.post(`${API_URL}/register`, { email, password });
    console.log("Response aya:", res.data);
    alert("User Registered!");
  } catch (err) {
    console.error("Masla agaya:", err);
    alert("Registration failed! Logs check karein.");
  }
};

  const handleAddTodo = async () => {
    try {
      // ✅ Localhost ki jagah API_URL use kiya
      await axios.post(`${API_URL}/add-todo`, { email, todo }); 
      setList([...list, todo]);
      setTodo('');
    } catch (err) {
      console.error("Add Todo Error:", err);
    }
  };

  const handleDelete = async (item) => {
    try {
      // ✅ Localhost ki jagah API_URL use kiya
      await axios.post(`${API_URL}/delete-todo`, { email, todo: item });
      setList(list.filter(t => t !== item));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="App">
      <h1>Modern To-Do (MERN) - Live</h1>
      <div className="auth">
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register/Login</button>
      </div>

      <div className="todo-box">
        <input value={todo} placeholder="Add a task..." onChange={(e) => setTodo(e.target.value)} />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => handleDelete(item)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
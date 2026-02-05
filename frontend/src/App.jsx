import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);

const handleRegister = async () => {
  console.log("Button Dab Gaya!"); // Ye line add karo
  try {
    const res = await axios.post("http://localhost:5000/register", { email, password });
    console.log("Response aya:", res.data);
    alert("User Registered!");
  } catch (err) {
    console.error("Masla agaya:", err);
  }
};

  const handleAddTodo = async () => {
    // App.jsx mein ye URL bilkul sahi hona chahiye
await axios.post("http://localhost:5000/register", { email, password });
    setList([...list, todo]);
    setTodo('');
  };

  const handleDelete = async (item) => {
    await axios.post('http://localhost:5000/delete-todo', { email, todo: item });
    setList(list.filter(t => t !== item));
  };

  return (
    <div className="App">
      <h1>Modern To-Do (MERN)</h1>
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
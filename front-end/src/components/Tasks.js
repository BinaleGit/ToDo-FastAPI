import React, { useState, useEffect } from "react";
function Tasks() {
  const [tasks, setTasks] = useState([]); // משתנה לשמירת המטלות
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // פונקציה לשליפת המטלות מ-API
  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    console.log(tasks); 
  }, [tasks]); 
  const getall = () => {
    fetch("http://localhost:8000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  };

  const addTask = (title, description) => {
    if (!title || !description) return;
  
    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.ok ? getall() : res.json().then((data) => console.error("Error:", data.detail)))
      .catch((err) => console.error("Error:", err));
  };
  
  return (
    <div className="App">
      <h1>My Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            - {task.title} {task.description}
          </li>
        ))}
      </ul>
      <h2>Add Task:</h2>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={() => addTask(title, description)}>Add Task</button>
    </div>
  );
}

export default Tasks;

import React, { useState, useEffect } from "react";
function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/tasks?user_id=${user}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        console.log("tasks:", data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);



  const getall = () => {
    fetch(`http://localhost:8000/tasks?user_id=${user}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  const addTask = (title, description) => {
    if (!title || !description) return;

    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, user_id: user })

    })

      .then((res) => res.ok ? getall() : res.json().then((data) => console.error("Error:", data.detail)))
      .catch((err) => console.error("Error:", err));
    console.log(JSON.stringify({ title, description, user_id: user }));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          getall();
        } else {
          console.error("Failed to delete task");
        }
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div className="App">
      <h1>My Tasks</h1>
      <h2>Hello User {user}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            - {task.title} {task.description}   <button onClick={() => deleteTask(task.id)}>Done!</button>
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

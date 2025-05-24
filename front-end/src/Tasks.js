import React, { useState, useEffect } from 'react';
function Tasks() { 
  const [tasks, setTasks] = useState([]);  // משתנה לשמירת המטלות
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()


  // פונקציה לשליפת המטלות מ-API
  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error:', error));
  }, []);

useEffect(() => {
  console.log(tasks); // זה יתבצע כל פעם שהסטייט מתעדכן
}, [tasks]); // [] אומר שהפונקציה תתבצע רק פעם אחת כשהקומפוננטה נטענת


const getall = () => {
    fetch('http://localhost:8000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error:', error));
  }

const addTask = (title, description) => {
  if (!title || !description) {
    console.error("Title and description are required");
    return;
  }

  console.log("Title:", title);
  console.log("Description:", description);

  fetch('http://localhost:8000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  })
  .then(response => {
    if (response.ok) {
      console.log('Task added successfully');
      getall();
    } else {
      return response.json();  // קבלת תשובה גם אם יש שגיאה
    }
  })
  .then(data => {
    if (data) {
      console.error('Error:', data.detail);  // הצגת פרטי השגיאה
    }
  })
  .catch(error => console.error('Error:', error));
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
        value={setTitle.title}
        onChange={(e) => setTitle({ title: e.target.value })}
      />
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={setDescription.description}
        onChange={(e) => setDescription({ description: e.target.value })}
      />
      <button onClick={() => addTask(title, description)}>Add Task</button>
    </div>
  );
};


export default Tasks;

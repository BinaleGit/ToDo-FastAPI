import { useState } from "react";
import './App.css';
import Tasks from './components/Tasks';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user === null ? (
        <>
          <Login setUser={setUser} />
          <Register />
        </>
      ) : (
        <Tasks user={user} />
      )}
    </div>
  );
}

export default App;

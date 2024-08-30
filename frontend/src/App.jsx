// App.js
import { useEffect, useState } from "react";
import { AddTodo } from "./Components/AddTodo";
import { TodoRendering } from "./Components/TodoRendering";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        setTodo(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  console.log("Re-rendered");
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-center text-3xl font-bold text-gray-800 my-5">
        Todo Application
      </h1>
      <AddTodo setTodo={setTodo} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {todo.map((singletodo) => (
          <TodoRendering
            key={singletodo._id}
            title={singletodo.title}
            id={singletodo._id}
            description={singletodo.description}
            completed={singletodo.completed}
            setTodo={setTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

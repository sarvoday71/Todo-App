import axios from "axios";

export function TodoRendering({ title, id, description, completed, setTodo }) {
  async function handleOnclick() {
    await axios.delete(`http://localhost:3000/todo/${id}`);
    const todos = await axios.get("http://localhost:3000/todos");
    setTodo(todos.data);
  }

  async function handleOnDone() {
    const updatedData = { title, description, completed: true };
    await axios.put(`http://localhost:3000/todo/${id}`, updatedData);
    const todos = await axios.get("http://localhost:3000/todos");
    setTodo(todos.data);
  }

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-5 transition-transform transform hover:scale-105 ${
        completed ? "border-gray-400 border-t-4" : "border-blue-400 border-t-4"
      }`}
    >
      <h2 className="text-xl font-medium mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            completed
              ? "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
          }`}
          onClick={handleOnDone}
        >
          {completed ? "Done" : "Mark as Done"}
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={handleOnclick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

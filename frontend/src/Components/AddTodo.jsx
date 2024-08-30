import { useState } from "react";
import axios from "axios";

export function AddTodo({ setTodo }) {
  const [formData, setFormData] = useState({ title: "", description: "" });

  async function handleOnsubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:3000/todo", formData);
    const todos = await axios.get("http://localhost:3000/todos");
    setFormData({ title: "", description: "" });
    setTodo(todos.data);
  }

  function handleOnchange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <form
      onSubmit={handleOnsubmit}
      className="bg-white shadow-md rounded-lg p-5 mb-8 mx-auto max-w-xl border border-gray-200"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleOnchange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Ex. Gym"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleOnchange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Ex. Go to the gym from 7:00 to 8:00"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-300"
      >
        Add Todo
      </button>
    </form>
  );
}

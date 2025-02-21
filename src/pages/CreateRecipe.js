import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.post("http://localhost:5000/api/recipes/add", {
      title,
      ingredients: ingredients.split(","),
      instructions,
      createdBy: userInfo._id,
    });
    socket.emit("new-recipe", data);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded-lg w-96">
        <h2 className="text-2xl mb-4 font-semibold text-center">Add Recipe</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-4 border rounded" />
        <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" className="w-full p-2 mb-4 border rounded" />
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export default CreateRecipe;

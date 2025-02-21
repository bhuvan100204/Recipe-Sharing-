import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes").then((res) => setRecipes(res.data));
    socket.on("update-recipes", (newRecipe) => setRecipes((prev) => [newRecipe, ...prev]));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Recipe Sharing Platform</h1>
      {recipes.map((recipe) => (
        <div key={recipe._id} className="border p-4 rounded-lg mb-4 shadow">
          <h2 className="text-xl font-semibold">{recipe.title}</h2>
          <p><strong>By:</strong> {recipe.createdBy.username}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
          <p>{recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
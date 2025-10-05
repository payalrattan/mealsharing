"use client";

import { useEffect, useState } from "react";
import { MealVM } from "@/models/meals/MealVM";
import { getMeals, deleteMealById } from "@/services/meal-services/mealServices";

export const DeleteMeal = () => {
  const [mealDelete, setMealDelete] = useState<MealVM[]>([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await getMeals(); // Fetch all meals
      setMealDelete(response);
    } catch (error) {
      console.error("Failed to fetch meals", error);
    }
  };

  const deleteMealHandler = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this meal?");
    if (!confirmDelete) return;

    try {
      await deleteMealById(id);
      alert("Meal deleted successfully");
      fetchMeals(); // Refresh the list after deletion
    } catch (error) {
      console.error("Delete failed", error);
      alert("Error deleting meal");
    }
  };

  return (
    <div>
      <h2>Meal List (Delete Option)</h2>
      {mealDelete.length === 0 && <p>No meals found.</p>}
      {mealDelete.map((meal) => (
        <div key={meal.MealId} style={{ marginBottom: "10px", border: "1px solid gray", padding: "10px" }}>
          <h3>{meal.Title}</h3>
          <p>{meal.Description}</p>
          <button onClick={() => deleteMealHandler(meal.MealId)} style={{ backgroundColor: "red", color: "white" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

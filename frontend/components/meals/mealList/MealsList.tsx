"use client";
import styles from "@/frontend/components/meals/mealList/mealList.module.css";
import { useEffect, useState } from "react";
import { getMeals } from "@/services/meal-services/mealServices";
import { Image } from "@/frontend/components/imageComponenet/Image";
import { MealVM } from "@/models/meals/MealVM";
// import { DeleteMeal } from "../delete-meal/DeleteMeal";
import Link from "next/link";

export const MealsList = () => {
  const [meal, setMeal] = useState<MealVM[]>([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    const response = await getMeals();
    setMeal(response);
  };

  return (
    <div className={styles.grid}>
      {meal.map((meal: MealVM) => (
        <div className={styles.card} key={meal.MealId}>
          <Image className={styles.image} src="./food.jpg" alt="Meal image" />
          <h2>{meal.Title}</h2>
          <Link href={`/meals/${meal.MealId}`}>View details</Link>
          {/* <DeleteMeal /> */}
        </div>
      ))}
    </div>
  );
};

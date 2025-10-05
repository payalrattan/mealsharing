"use client";
import styles from "./MealDetail.module.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MealVM } from "@/models/meals/MealVM";
import { getMealById } from "@/services/meal-services/mealServices";
import { ReservationForm } from "@/frontend/components/reservations/reservationForm/ReservationForm";
import { ReviewForm } from "../../reviews/reviewForm/ReviewForm";
import { Button } from "@/frontend/components/button/Button";
import { Image } from "../../imageComponenet/Image";
import { deleteMealById } from "@/services/meal-services/mealServices";

export const MealDetail = () => {
  const [meal, setMeal] = useState<MealVM | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [showReservationForm, setShowReservationForm] =
    useState<boolean>(false);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const params = useParams();
  const slug = params.slug as string;
  const mealId = Number(slug);

  useEffect(() => {
    if (!mealId) return;
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getMealById(mealId!);
      setMeal(response);
    } catch (e) {
      setIsError(true);
      setError(String(e));
    } finally {
      setIsLoading(false);
    }
  };
    const deleteMealHandler = async (id: number) => {
      const confirmDelete = confirm("Are you sure you want to delete this meal?");
      if (!confirmDelete) return;
  
      try {
        await deleteMealById(id);
        alert("Meal deleted successfully");
        getData(); // Refresh the list after deletion
      } catch (error) {
        console.error("Delete failed", error);
        alert("Error deleting meal");
      }
    };

  return (
    <div className={styles.container}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading meal: {error}</p>}

      {meal && (
        <div className={styles.mealBox}>
          <Image className={styles.image} src="/food.jpg" alt="Meal image" />
          <p>
            <b>Name of the Meal:</b> {meal.Title}
          </p>
          <p>
            <b>Description:</b> {meal.Description}
          </p>
          <p>
            <b>Created:</b> {meal.CreatedDate}
          </p>
          <p>
            <b>Price:</b> {meal.Price}€
          </p>
          <p>
            <b>Location:</b> {meal.Location}
          </p>

          <div className={styles.buttons}>
            <Button
              action={() => setShowReservationForm(!showReservationForm)}
              text={showReservationForm ? "Hide Reservation" : "Reserve Meal"}
              appearance={styles.button}
            />
            <Button
              action={() => setShowReviewForm(!showReviewForm)}
              text={showReviewForm ? "Hide Review" : "Review Meal"}
              appearance={styles.button}
            />
          </div>
          <Button 
          action={()=>deleteMealHandler(meal.MealId)}
          text = "Delete" 
          appearance={styles.button}/>
          
          

          {showReservationForm && <ReservationForm mealId={meal.MealId} />}
          {showReviewForm && <ReviewForm mealId={meal.MealId} />}
        </div>
      )}
    </div>
  );
};

"use client";
import styles from "./MealDetail.module.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MealVM } from "@/modals/meals/MealVM";
import { getMealById } from "@/services/meal-services/mealServices";
import { ReservationForm } from "@/frontend/components/reservations/reservationForm/ReservationForm";
import { ReviewForm } from "../../reviews/reviewForm/ReviewForm";
import { Button } from "@/frontend/components/button/Button";
import { Image } from "../../imageComponenet/Image";

export const MealDetail = () => {
  const [meal, setMeal] = useState<MealVM | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [showReservationForm, setShowReservationForm] = useState<boolean>(false);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const params = useParams();
  console.log(params);
  
  const slug = params.slug as string;
  console.log(slug);
  
  const MealId = slug.split("-").pop();

  useEffect(() => {
    if (!MealId) return;
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getMealById(MealId!);
      setMeal(response);
    } catch (e) {
      setIsError(true);
      setError(String(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading meal: {error}</p>}

      {meal && (
        <div className={styles.mealBox}>
           <Image className={styles.image} src="/food.jpg" alt="Meal image"  />
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

          {showReservationForm && <ReservationForm MealId={meal.MealId} />}
          {showReviewForm && <ReviewForm MealId={meal.MealId} />}
        </div>
      )}
    </div>
  );
};

// meal card component to display a list of meals
import { MEAL_SHARE_API } from "@/data/mealSharedAPI/mealShareApi";
import styles from "@/app/page.module.css";
import { Image } from "@/frontend/components/imageComponenet/Image";

type Meal = {
  MealId: number;
  Title: string;
  Description: string;
  Price: number;
  CreatedDate: string;
  MaxReservations: number;
  Location: string;
};

export async function MealList() {
  const res = await fetch(`${MEAL_SHARE_API.BASE_URL}meals`);
  const mealData = await res.json();

  return (
    <div className={styles.grid}>
      {mealData.data.map((meal: Meal) => (
        <div className={styles.card} key={meal.MealId}>
          <Image className={styles.image} src="./food.jpg" alt="Meal image" />
          <h2>{meal.Title}</h2>
          <p>{meal.Description}</p>
          <p>Price: {meal.Price} €</p>
          <p>Created: {meal.CreatedDate}</p>
          <p>Guests: {meal.MaxReservations}</p>
          <p>Location: {meal.Location}</p>
        </div>
      ))}
    </div>
  );
}

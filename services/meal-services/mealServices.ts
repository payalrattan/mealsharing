import { axiosService } from "@/data/api/httpCommon";
import { MealVM } from "@/models/meals/MealVM";

//service to get all meals

export const getMeals = async () => {
  const result = await axiosService.get("meals");
  console.log(result);
  console.log(result.data.data);
  return result.data.data;
};
//service to get meal by id
export const getMealById = async (id: string | number) => {
  const path = `meals/by-id/${id}`;
  const result = await axiosService.get(path);
  return result.data.data;
};

//create meal
export const createMeal = async (body: MealVM) => {
  try {
    const response = await axiosService.post("meal", body);
    console.log("Meal created", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("Error creating Meal", error);
    throw error;
  }
};

//delete meal by id
export const deleteMealById = async (id: string | number) => {
  const path = `/meals/${id}`;
  const result = await axiosService.delete(path);
  return result.data.data;
};

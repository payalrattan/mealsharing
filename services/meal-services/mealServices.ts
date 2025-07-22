import { axiosService } from "@/data/api/httpCommon";

//service to get all meals

export const getMeals = async () => {
  const result = await axiosService.get("meals");
  console.log(result);
  console.log(result.data.data);
  return result.data.data;
};
//service to get meal by id
export const getMealById = async (id: string|number) => {
  const path = `meals/by-id/${id}`;
  const result = await axiosService.get(path);
  return result.data.data;
};


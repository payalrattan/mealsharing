import { createMeal } from "@/services/meal-services/mealServices";
import { useState } from "react";

export const AddMeal = ()=>{
    const [meal,setMeal] = useState({
        MealId:"",
Title :"",
Description:"",
Location :"",
When:"",
MaxReservations:"",
Price:"",
CreatedDate:""
    })
}

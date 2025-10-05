"use client";
import styles from "@/frontend/components/reviews/reviewForm/reviewForm.module.css";
import { useState } from "react";
import { postReview } from "@/services/review-services/reviewServices";


type Props = {
  mealId: number
};
export const ReviewForm = ({ mealId }: Props) => {
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Stars: 1,
  });

  const handleSubmit = async (formData: FormData) => {
    try {
      const formInput = {
        Id: 0, // or undefined if your API assigns it
        Title: formData.get("title") as string,
        Description: formData.get("description") as string,
        Stars: Number(formData.get("stars")),
        CreatedDate: new Date().toISOString(),
        MealId: mealId,
      };

      await postReview(formInput);
      alert("Review submitted!");
    } catch (error) {
      console.error("POST error:", error);
      alert("Error submitting review");
    }
  };

  return (
    <form action={handleSubmit} className={styles.reviewForm}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Review title"
        value={form.Title}
        onChange={(e) => setForm({ ...form, Title: e.target.value })}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        placeholder="Write your review here"
        value={form.Description}
        onChange={(e) => setForm({ ...form, Description: e.target.value })}
      />

      <label htmlFor="stars">Stars</label>
      <input
        type="number"
        name="stars"
        min={1}
        max={5}
        value={form.Stars}
        onChange={(e) => setForm({ ...form, Stars: Number(e.target.value) })}
        required
      />

      <button type="submit">Leave a Review</button>
    </form>
  );
};

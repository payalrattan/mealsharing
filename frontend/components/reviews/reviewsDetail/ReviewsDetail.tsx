"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ReviewsVM } from "@/modals/reviews/ReviewsVM";
import { getReviewsById } from "@/services/review-services/reviewServices";

export const ReviewsDetail = () => {
  const [reviews, setReviews] = useState<ReviewsVM | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const params = useParams();
  const slug = params.slug as string;
  const reviewId = slug.split("-").pop();

  useEffect(() => {
    console.log("Slug:", slug);
    console.log("Review ID extracted:", reviewId);
    if (!reviewId) return;
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getReviewsById(reviewId!);
      console.log("API response:", response);
      setReviews(response);
    } catch (e) {
      setIsError(true);
      setError(String(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <h2>Loading...</h2>}
      {isError && (
        <div>
          <p>Something went wrong:</p>
          <p>{error || "N/A"}</p>
        </div>
      )}
      {!isLoading && !reviews && !isError && (
        <p>No review found for this ID.</p>
      )}
      {reviews && (
        <div>
          <p>Id: {reviews.Id}</p>
          <p>Title: {reviews.Title}</p>
          <p>Stars: {reviews.Stars}</p>
          <p>Created: {reviews.CreatedDate}</p>
          <p>Meal ID: {reviews.MealId}</p>
        </div>
      )}
    </div>
  );
};

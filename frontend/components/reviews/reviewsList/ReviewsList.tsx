"use client";
import { useEffect, useState } from "react";
import { getReviews } from "@/services/review-services/reviewServices";
import { ReviewsVM } from "@/models/reviews/ReviewsVM";
import Link from "next/link";

export const ReviewsList = () => {
  const [data, setData] = useState<ReviewsVM[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const result = await getReviews();
    setData(result);
  };

  return (
    <div>
      {data &&
        data.map((review) => (
          <div key={review.Id}>
            <p>Id: {review.Id}</p>
            <p>Title:{review.Title}</p>
            <p>Description:{review.Description}</p>
            <p>Stars:{review.Stars}</p>
            <p>MealId:{review.MealId}</p>
            <Link href={`/reviews/${review.Id}`}>view details</Link>
          </div>
        ))}
      {data && JSON.stringify(data, null, 2)}
    </div>
  );
};

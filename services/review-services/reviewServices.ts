import { axiosService } from "@/data/api/httpCommon";
import { ReviewsVM } from "@/modals/reviews/ReviewsVM";
//getting all reviews
export const getReviews = async () => {
  const result = await axiosService.get("reviews");
  console.log(result.data.data);
  return result.data.data;
};
//getting reviews by id
export const getReviewsById = async (id: string | number) => {
  const result = await axiosService.get(`reviews/${id}`);
  const reviewArray = result.data.review;

  if (Array.isArray(reviewArray) && reviewArray.length > 0) {
    return reviewArray[0];
  } else {
    return null;
  }
};

//creating review
export const postReview = async (body: ReviewsVM) => {
  try {
    const result = await axiosService.post("reviews", body); 
    console.log("Review created:", result.data.review);
    return result.data.review;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

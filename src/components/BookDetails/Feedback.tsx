import React, { useEffect } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { getBookReviews } from "../../api/bookApi";

type FeedbackProps = {
  bookDetails: any,
  reviews: string[],
  setReviews: any,
  getReviews: any
}

function Feedback({bookDetails, reviews, setReviews, getReviews}: FeedbackProps) {
 
  useEffect(() => {
    getReviews();
  }, [bookDetails?._id]);

  return (
    <div className="mt-4">
      {reviews.length > 0 ? (
        reviews.map((review: any) => (
          <div className="flex gap-4 py-3 border-b border-gray-100 items-start" key={review._id}>
            <div className="w-10 h-10 bg-[#F5F5F5] flex items-center justify-center rounded-full flex-shrink-0">
              <p className="text-[#707070] font-medium">
                {review.user_id?.fullName?.split(" ")[0]?.charAt(0).toUpperCase() || '?'}
              </p>
            </div>

            <div className="flex flex-col gap-1 flex-grow">
              <p className="text-[#0A0102] font-semibold text-sm">
                {review.user_id?.fullName || 'Anonymous User'}
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-base">
                    {star <= review.rating ? (
                      <IoStarSharp className="text-[#FFD700]" />
                    ) : (
                      <IoStarOutline className="text-[#707070]" />
                    )}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#707070] mt-1">{review?.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="py-4 text-center text-gray-500">
          No reviews yet for this book
        </div>
      )}
    </div>
  );
}

export default Feedback;
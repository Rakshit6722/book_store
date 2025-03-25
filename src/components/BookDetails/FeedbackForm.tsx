import React, { useState } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { addBookReview } from "../../api/bookApi";

type FeedbackFormProps = {
    bookDetails: any;
    getReviews?: any;
};

function FeedbackForm({ bookDetails, getReviews }: FeedbackFormProps) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    console.log("bookDetails", bookDetails);

    const submitReviewHandler = async () => {
        try {
            const response = await addBookReview(bookDetails?._id, comment, rating)
            if(response?.data?.success){
                getReviews()
                setComment("")
                setRating(0)
            }
        } catch (err) {
            console.log("Error in submitting review", err)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-lg">Customer Feedback</p>
            <div className="flex flex-col rounded-sm gap-2 bg-[#F5F5F5] p-4">
                <p className="text-xs font-semibold">Overall rating</p>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(star)}
                            className="cursor-pointer text-xl"
                        >
                            {star <= (hover || rating) ? (
                                <IoStarSharp className="text-[#FFD700]" />
                            ) : (
                                <IoStarOutline className="text-[#707070]" />
                            )}
                        </span>
                    ))}
                </div>
                <textarea
                    className="w-full h-24 p-2 placeholder:text-sm"
                    placeholder="Write your review"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                    <button onClick={submitReviewHandler} className="bg-[#3371B5] w-24 py-1 rounded-sm text-white text-sm">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeedbackForm;

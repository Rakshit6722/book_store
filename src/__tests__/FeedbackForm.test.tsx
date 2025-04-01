import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedbackForm from "../components/BookDetails/FeedbackForm";
import { addBookReview } from "../api/bookApi"; 
import React from "react";

jest.mock("../api/bookApi", () => ({
  addBookReview: jest.fn(),
}));

describe("FeedbackForm component test", () => {
  const bookDetails = {
    _id: "12345",
  };
  const getReviews = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render correctly", () => {
    render(<FeedbackForm bookDetails={bookDetails} getReviews={getReviews} />);
    expect(screen.getByTestId(/mainHeading-div/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Write your review/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test("should update rating when a star is clicked", () => {
    render(<FeedbackForm bookDetails={bookDetails} getReviews={getReviews} />);
    const stars = screen.getAllByRole("button");

    fireEvent.click(stars[2]); 

    waitFor(()=>{
        expect(stars[0]).toHaveClass("text-[#FFD700]");
        expect(stars[1]).toHaveClass("text-[#FFD700]");
        expect(stars[2]).toHaveClass("text-[#FFD700]");
        expect(stars[3]).not.toHaveClass("text-[#FFD700]");
    })
  });

  test("should highlight stars on hover", async () => {
    render(<FeedbackForm bookDetails={bookDetails} getReviews={getReviews} />);
    const stars = screen.getAllByRole("button");

    fireEvent.mouseEnter(stars[3]); 

    waitFor(() => {
        expect(stars[0]).toHaveClass("text-[#FFD700]");
        expect(stars[1]).toHaveClass("text-[#FFD700]");
        expect(stars[2]).toHaveClass("text-[#FFD700]");
        expect(stars[3]).toHaveClass("text-[#FFD700]");
        expect(stars[4]).not.toHaveClass("text-[#FFD700]");
    })

    fireEvent.mouseLeave(stars[3]); 
    waitFor(() => {
        expect(stars[3]).not.toHaveClass("text-[#FFD700]");
    })
  });

  test("should update comment when typing", () => {
    render(<FeedbackForm bookDetails={bookDetails} getReviews={getReviews} />);
    const textarea = screen.getByPlaceholderText(/Write your review/i);

    fireEvent.change(textarea, { target: { value: "Amazing book!" } });
    expect(textarea).toHaveValue("Amazing book!");
  });

  test("should call addBookReview and reset form on submit", async () => {
    (addBookReview as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(<FeedbackForm bookDetails={bookDetails} getReviews={getReviews} />);
    const stars = screen.getAllByRole("button");
    const textarea = screen.getByPlaceholderText(/Write your review/i);
    const submitButton = screen.getByText(/Submit/i);

    fireEvent.click(stars[4]); 
    fireEvent.change(textarea, { target: { value: "Awesome read!" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(addBookReview).toHaveBeenCalledWith("12345", "Awesome read!", 5)
        expect(getReviews).toHaveBeenCalled();
        expect(textarea).toHaveValue("");
    })
  });

  test("should handle API failure gracefully", async () => {
    (addBookReview as jest.Mock).mockRejectedValue(new Error("Network error"));

    render(<FeedbackForm bookDetails={bookDetails} getReviews={getReviews} />);
    const submitButton = screen.getByText(/Submit/i);

    fireEvent.click(submitButton);

    await waitFor(() => expect(addBookReview).toHaveBeenCalled());
    expect(getReviews).not.toHaveBeenCalled(); 
  });
});

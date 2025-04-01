import React from 'react'
import Feedback from '../components/BookDetails/Feedback'
import { render, screen } from '@testing-library/react'
import { IoStarSharp, IoStarOutline } from "react-icons/io5";

describe("Feedback component test", () => {

    const reviews = [
        {
            _id: "1",
            user_id: { fullName: "Test User 1" },
            rating: 5,
            comment: "Great book!"
        },
        {
            _id: "2",
            user_id: { fullName: "Test User 2" },
            rating: 4,
            comment: "Very informative."
        }
    ]

    const bookDetails = {
        _id:"12345"
    }

    const getReviews = jest.fn()

    test("renders correctly", () => {
        render(
            <Feedback bookDetails={bookDetails} reviews={reviews} getReviews={getReviews} />
        )
        expect(screen.getByTestId(/review-div/i)).toBeInTheDocument()
    })

    test("shows now review found if no review is available",() => {
        const emptyReviews: any = []

        render(
            <Feedback bookDetails={bookDetails} reviews={emptyReviews} getReviews={getReviews} />
        )

        expect(screen.getByText(/No reviews yet for this book/i)).toBeInTheDocument()
    })


    test("get reviews to be called on initial render", () => {
        render(
            <Feedback bookDetails={bookDetails} reviews={reviews} getReviews={getReviews} />
        )

        expect(getReviews).toHaveBeenCalled()
    })

    test("correctly render user details", () => {
        render(
            <Feedback bookDetails={bookDetails} reviews={reviews} getReviews={getReviews} />
        )

        expect(screen.getByText(/Test User 1/i)).toBeInTheDocument()
        expect(screen.getByText(/Test User 2/i)).toBeInTheDocument()

    })

    test("correctly render comments and rating", () => {
        render(
            <Feedback bookDetails={bookDetails} reviews={reviews} getReviews={getReviews} />
        )

        expect(screen.getByText(/Great book!/i)).toBeInTheDocument()
        expect(screen.getByText(/Very informative./i)).toBeInTheDocument()

    })


})
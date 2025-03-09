import React from 'react'
import bookCover from '../../assets/images/bookImage.png'
import Book from './Book'

const books = [
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
    {
        title:"Don't Make Me Think",
        author:"Steve Krug",
        rating:4.5,
        price: 1500,
        cover: bookCover
    },
]

const BookCatalogue = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {
        books.map((book, index) => (
            <div key={index} className='flex justify-center'>
                <Book book={book}/>
            </div>
        ))
      }
    </div>
  )
}

export default BookCatalogue
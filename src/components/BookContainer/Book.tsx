import React from 'react'
import { IoStar } from "react-icons/io5";

type book = {
    bookName: string,
    author: string,
    rating: number,
    price: number,
    discountPrice: number,
    cover: string 
}

type bookProps = {
    book: book
}

const Book = ({ book }: bookProps) => {
    return (
        <div className='flex flex-col w-full max-w-[240px] h-[275px] border-2 hover:shadow-lg '>
            <div className='w-full h-[172px] flex items-center justify-center bg-[#F5F5F5]'>
                <img loading='lazy' className='w-24 object-contain' src={book.cover} alt={book.bookName} />
            </div>
            <div className='w-full p-4'>
                <p className='text-md font-semibold'>{book.bookName}</p>
                <p className='text-[#878787] text-xs font-normal mb-1'>by {book.author}</p>
                <div className='flex text-xs items-center gap-1'>
                    <div className='flex h-5 px-1 items-center justify-center text-white text-xs bg-[#388E3C] rounded-sm'>
                        <span>{4.5}</span>
                        <IoStar className='text-white text-xs ml-0.5' />
                    </div>
                    <p className='text-[#878787]'>(20)</p>
                </div>
                <div className='mt-1 flex items-center space-x-2'>
                    <p className='font-semibold'>Rs. {book.discountPrice}</p>
                    <p className='text-[#878787] text-xs line-through'>{book.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Book;

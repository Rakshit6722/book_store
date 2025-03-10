import React from 'react'
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md"

type bookLongCardProps = {
    book: any,
    container?: string
}

function BookLongCard({ book, container }: bookLongCardProps) {
    return (
        <div className={`flex flex-col md:flex-row justify-between ${container==='wishlist' ? "items-center" : "items-start"} w-full py-6 px-4 md:px-9 border-2 ${container==='wishlist' ? "border-[#F5F5F5]" : "border-[#E4E4E4]"} rounded-sm gap-4 md:gap-0`}>
            <div className='flex items-center space-x-4'>
                <div>
                    <img className='w-16' src={book?.cover} alt='book-cover-image' />
                </div>
                <div>
                    <p className='text-lg'>{book?.title}</p>
                    <p className='text-[#9D9D9D] text-xs'>{book?.author}</p>
                    <div className='mt-1 flex items-center space-x-2'>
                        <p className='font-semibold'>Rs. {book?.price}</p>
                        <p className='text-[#878787] text-xs line-through'>Rs. 2000</p>
                    </div>
                </div>
            </div>
            <div>
                {
                    container === 'order' && (
                        <div>
                            <div className='flex items-center space-x-2'>
                                <GoDotFill className='text-[#26A541]'/>
                                <p className='text-sm text-[#0A0102] font-semibold'>Order placed on May 21</p>
                            </div>
                        </div>
                    )
                }
                {
                    container === 'wishlist' && (
                        <div>
                            <MdDelete className='text-[#9D9D9D] cursor-pointer hover:text-black' />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BookLongCard
